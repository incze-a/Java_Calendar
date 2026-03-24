package SD.nCalendar.service;

import SD.nCalendar.model.OneTimeEvent;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final List<OneTimeEvent> events = new ArrayList<>();
    private Long idCounter=1L;

    public OneTimeEvent addEvent(OneTimeEvent event) {
        event.setId(idCounter++);
        events.add(event);
        return event;
    }
    public List<OneTimeEvent> getEventsForDate(LocalDate date) {
        return events.stream()
                .filter(e->e.getDate().equals(date))
                .collect(Collectors.toList());
    }
}
