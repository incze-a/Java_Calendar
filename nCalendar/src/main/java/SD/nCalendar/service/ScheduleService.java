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

    public RecurringScheduleBlock addBlock(RecurringScheduleBlock block) {
        block.setId(idCounter++);
        blocks.add(block);
        return block;
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
