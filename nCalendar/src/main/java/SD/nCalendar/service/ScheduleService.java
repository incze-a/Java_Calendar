package SD.nCalendar.service;

import SD.nCalendar.model.OneTimeEvent;
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
        //check title
        if (block.getTitle() == null || block.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Empty title is not accepted");
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

    public void deleteBlock(Long id) {
        boolean removed = blocks.removeIf(block -> block.getId().equals(id));

        if (!removed) {
            throw new IllegalArgumentException("Block not found with id: " + id);
        }
    }

    public RecurringScheduleBlock updateBlock(Long id, RecurringScheduleBlock updatedBlock) {
        for (RecurringScheduleBlock existing : blocks) {
            if (existing.getId().equals(id)) {


                if (updatedBlock.getStartTime() == null || updatedBlock.getEndTime() == null) {
                    throw new IllegalArgumentException("Start time and end time are required");
                }

                if (!updatedBlock.getStartTime().isBefore(updatedBlock.getEndTime())) {
                    throw new IllegalArgumentException("Invalid start and end times");
                }

                if (updatedBlock.getTitle() == null || updatedBlock.getTitle().trim().isEmpty()) {
                    throw new IllegalArgumentException("Empty title is not accepted");
                }

                // overlap check, ignoring the event being updated
                for (RecurringScheduleBlock other : blocks) {
                    if (!other.getId().equals(id)
                            && other.getDayOfWeek() != null
                            && other.getDayOfWeek().equals(updatedBlock.getDayOfWeek())) {

                        if (updatedBlock.getStartTime().isBefore(other.getEndTime())
                                && updatedBlock.getEndTime().isAfter(other.getStartTime())) {
                            throw new IllegalArgumentException("Updated event overlaps with existing event");
                        }
                    }
                }

                existing.setTitle(updatedBlock.getTitle());
                existing.setStartTime(updatedBlock.getStartTime());
                existing.setEndTime(updatedBlock.getEndTime());
                existing.setColor(updatedBlock.getColor());

                return existing;
            }
        }

        throw new IllegalArgumentException("Event not found with id: " + id);
    }
}
