package SD.nCalendar.controller;

import SD.nCalendar.model.OneTimeEvent;
import SD.nCalendar.model.RecurringScheduleBlock;
import SD.nCalendar.service.ScheduleService;
import org.springframework.http.ResponseEntity;
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
    public RecurringScheduleBlock addBlock(
            @RequestParam Long userId,
            @RequestBody RecurringScheduleBlock block
    ) {
        return scheduleService.addBlock(userId, block);
    }

    @DeleteMapping("/{id}")
    public void deleteBlock(@PathVariable Long id) {
        scheduleService.deleteBlock(id);
    }

    @PutMapping("/{id}")
    public RecurringScheduleBlock updateBlock(
            @PathVariable Long id,
            @RequestBody RecurringScheduleBlock updatedBlock
    ) {
        return scheduleService.updateBlock(id, updatedBlock);
    }
}
