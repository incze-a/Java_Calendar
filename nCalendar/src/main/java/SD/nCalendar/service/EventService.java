package SD.nCalendar.service;

import SD.nCalendar.model.OneTimeEvent;
import SD.nCalendar.model.User;
import SD.nCalendar.repository.OneTimeEventRepository;
import SD.nCalendar.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {

    private final OneTimeEventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(
            OneTimeEventRepository eventRepository,
            UserRepository userRepository
    ) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public OneTimeEvent addEvent(Long userId, OneTimeEvent event) {
        User user = getUser(userId);

        event.setUser(user);

        validateEvent(userId, event, null);

        return eventRepository.save(event);
    }

    public List<OneTimeEvent> getEventsForDate(Long userId, LocalDate date) {
        return eventRepository.findByUserIdAndDate(userId, date);
    }

    public OneTimeEvent updateEvent(Long id, OneTimeEvent updatedEvent) {
        OneTimeEvent existing = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event not found with id: " + id));

        Long userId = existing.getUser().getId();

        validateEvent(userId, updatedEvent, id);

        existing.setTitle(updatedEvent.getTitle());
        existing.setDate(updatedEvent.getDate());
        existing.setStartTime(updatedEvent.getStartTime());
        existing.setEndTime(updatedEvent.getEndTime());
        existing.setColor(updatedEvent.getColor());

        return eventRepository.save(existing);
    }

    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new IllegalArgumentException("Event not found with id: " + id);
        }

        eventRepository.deleteById(id);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
    }

    private void validateEvent(Long userId, OneTimeEvent event, Long ignoredId) {
        if (event.getTitle() == null || event.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Empty title is not accepted");
        }

        if (event.getDate() == null) {
            throw new IllegalArgumentException("One-time events must have a date");
        }

        if (event.getStartTime() == null || event.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time are required");
        }

        if (!event.getStartTime().isBefore(event.getEndTime())) {
            throw new IllegalArgumentException("Invalid start and end times");
        }

        List<OneTimeEvent> sameDateEvents =
                eventRepository.findByUserIdAndDate(userId, event.getDate());

        for (OneTimeEvent existing : sameDateEvents) {
            if (ignoredId != null && existing.getId().equals(ignoredId)) {
                continue;
            }

            boolean overlaps =
                    event.getStartTime().isBefore(existing.getEndTime()) &&
                            event.getEndTime().isAfter(existing.getStartTime());

            if (overlaps) {
                throw new IllegalArgumentException("New block overlaps with existing block");
            }
        }
    }
}