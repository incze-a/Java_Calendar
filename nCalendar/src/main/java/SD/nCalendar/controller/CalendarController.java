package SD.nCalendar.controller;


import SD.nCalendar.DTO.DaySchedule;
import SD.nCalendar.model.RecurringScheduleBlock;
import SD.nCalendar.service.CalendarService;
import SD.nCalendar.service.ScheduleService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/calendar")
public class CalendarController {
    private final CalendarService calendarService;

    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping("/week")
    public List<DaySchedule> getWeek(@RequestParam String startDate){
        return calendarService.getWeekSchedule(LocalDate.parse(startDate));
    }
}
