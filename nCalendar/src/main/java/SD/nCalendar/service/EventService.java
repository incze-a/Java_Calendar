package SD.nCalendar.service;

import SD.nCalendar.model.OneTimeEvent;
import SD.nCalendar.model.RecurringScheduleBlock;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService { //handle one time events
    private final List<OneTimeEvent> events = new ArrayList<>();
    private Long idCounter=1L;

    public OneTimeEvent addEvent(OneTimeEvent event) {
        if (event.getDate() == null) {
            throw new IllegalArgumentException("One-time events must have a date");
        }

        if (event.getStartTime() == null || event.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time are required");
        }

        if (!event.getStartTime().isBefore(event.getEndTime())) {
            throw new IllegalArgumentException("Invalid start and end times");
        }
        //check overlap
        for(OneTimeEvent existing: events) {
            if(existing.getDate().equals(event.getDate())) {
                //same day
                if(event.getStartTime().isBefore(existing.getEndTime()) &&
                        event.getEndTime().isAfter(existing.getStartTime())) {
                    throw new IllegalArgumentException("" +
                            "New block overlaps with existing block");
                }
            }
        }
        //check title
        if (event.getTitle() == null || event.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Empty title is not accepted");
        }

        event.setId(idCounter++);
        events.add(event);
        return event;
    }
    public List<OneTimeEvent> getEventsForDate(LocalDate date) {
        return events.stream()
                .filter(e -> e.getDate() != null && e.getDate().equals(date))
                .collect(Collectors.toList());
    }

    public void deleteEvent(Long id) {
        boolean removed = events.removeIf(event -> event.getId().equals(id));

        if (!removed) {
            throw new IllegalArgumentException("Event not found with id: " + id);
        }
    }

    public OneTimeEvent updateEvent(Long id, OneTimeEvent updatedEvent) {
        for (OneTimeEvent existing : events) {
            if (existing.getId().equals(id)) {

                if (updatedEvent.getDate() == null) {
                    throw new IllegalArgumentException("One-time events must have a date");
                }

                if (updatedEvent.getStartTime() == null || updatedEvent.getEndTime() == null) {
                    throw new IllegalArgumentException("Start time and end time are required");
                }

                if (!updatedEvent.getStartTime().isBefore(updatedEvent.getEndTime())) {
                    throw new IllegalArgumentException("Invalid start and end times");
                }

                if (updatedEvent.getTitle() == null || updatedEvent.getTitle().trim().isEmpty()) {
                    throw new IllegalArgumentException("Empty title is not accepted");
                }

                // overlap check, ignoring the event being updated
                for (OneTimeEvent other : events) {
                    if (!other.getId().equals(id)
                            && other.getDate() != null
                            && other.getDate().equals(updatedEvent.getDate())) {

                        if (updatedEvent.getStartTime().isBefore(other.getEndTime())
                                && updatedEvent.getEndTime().isAfter(other.getStartTime())) {
                            throw new IllegalArgumentException("Updated event overlaps with existing event");
                        }
                    }
                }

                existing.setTitle(updatedEvent.getTitle());
                existing.setDate(updatedEvent.getDate());
                existing.setStartTime(updatedEvent.getStartTime());
                existing.setEndTime(updatedEvent.getEndTime());
                existing.setColor(updatedEvent.getColor());

                return existing;
            }
        }

        throw new IllegalArgumentException("Event not found with id: " + id);
    }
}
