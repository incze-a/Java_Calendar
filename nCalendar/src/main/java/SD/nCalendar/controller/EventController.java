package SD.nCalendar.controller;


import SD.nCalendar.model.OneTimeEvent;
import SD.nCalendar.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public OneTimeEvent addEvent(
            @RequestParam Long userId,
            @RequestBody OneTimeEvent event
    ) {
        return eventService.addEvent(userId, event);
    }

    @GetMapping("/{date}")
    public List<OneTimeEvent> getEvents(
            @PathVariable String date,
            @RequestParam Long userId
    ) {
        return eventService.getEventsForDate(userId,LocalDate.parse(date));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }

    @PutMapping("/{id}")
    public OneTimeEvent updateEvent(
            @PathVariable Long id,
            @RequestBody OneTimeEvent updatedEvent
    ) {
        return eventService.updateEvent(id, updatedEvent);
    }
}
