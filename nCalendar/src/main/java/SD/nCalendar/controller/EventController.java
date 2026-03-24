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
    public OneTimeEvent addEvent(@RequestBody OneTimeEvent oneTimeEvent) {
        return eventService.addEvent(oneTimeEvent);
    }

    @GetMapping("/{date}")
    public List<OneTimeEvent> getEvents(@PathVariable String date) {
        return eventService.getEventsForDate(LocalDate.parse(date));
    }
}
