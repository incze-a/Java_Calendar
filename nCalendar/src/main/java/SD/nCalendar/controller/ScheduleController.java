package SD.nCalendar.controller;

import SD.nCalendar.model.RecurringScheduleBlock;
import SD.nCalendar.service.ScheduleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping
    public RecurringScheduleBlock addBlock(@RequestBody RecurringScheduleBlock block) {
        return scheduleService.addBlock(block);
    }

    @GetMapping
    public List<RecurringScheduleBlock> getBlocks() {
        return scheduleService.getAllBlocks();
    }
}
