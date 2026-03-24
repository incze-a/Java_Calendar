package SD.nCalendar.controller;

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
    public ResponseEntity<String> addBlock(@RequestBody RecurringScheduleBlock block) {
        try{
            scheduleService.addBlock(block);
            return ResponseEntity.ok("Block added successfully");
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping
    public List<RecurringScheduleBlock> getBlocks() {
        return scheduleService.getAllBlocks();
    }
}
