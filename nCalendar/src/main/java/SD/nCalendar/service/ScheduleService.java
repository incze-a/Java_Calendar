package SD.nCalendar.service;

import SD.nCalendar.model.RecurringScheduleBlock;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService { //handle recurring blocks
    private final List<RecurringScheduleBlock> blocks = new ArrayList<>();
    private Long idCounter=1L;

    public void addBlock(RecurringScheduleBlock block) {
        //check overlap
        for(RecurringScheduleBlock existing: blocks) {
            if(existing.getDayOfWeek().equals(block.getDayOfWeek())) {
                //same day
                if(block.getStartTime().isBefore(existing.getEndTime()) &&
                        block.getEndTime().isAfter(existing.getStartTime())) {
                    throw new IllegalArgumentException("" +
                            "New block overlaps with existing block");
                }
            }
        }
        //check time
        if(block.getStartTime().isAfter(block.getEndTime()) || block.getStartTime().equals(block.getEndTime())) {
            throw new IllegalArgumentException("Invalid start and end times");
        }
        block.setId(idCounter++);
        blocks.add(block);
    }

    public List<RecurringScheduleBlock> getAllBlocks() {
        return blocks;
    }

    public List<RecurringScheduleBlock> getBlocksForDay(DayOfWeek day) {
        return blocks.stream().
                filter(b->b.getDayOfWeek()==day)
                .collect(Collectors.toList());
    }
}
