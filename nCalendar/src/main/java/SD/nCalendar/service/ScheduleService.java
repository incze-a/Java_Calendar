package SD.nCalendar.service;

import SD.nCalendar.model.RecurringScheduleBlock;
import SD.nCalendar.model.User;
import SD.nCalendar.repository.RecurringScheduleBlockRepository;
import SD.nCalendar.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;

@Service
public class ScheduleService {

    private final RecurringScheduleBlockRepository scheduleRepository;
    private final UserRepository userRepository;

    public ScheduleService(
            RecurringScheduleBlockRepository scheduleRepository,
            UserRepository userRepository
    ) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
    }

    public RecurringScheduleBlock addBlock(Long userId, RecurringScheduleBlock block) {
        User user = getUser(userId);

        block.setUser(user);

        validateBlock(userId, block, null);

        return scheduleRepository.save(block);
    }

    public List<RecurringScheduleBlock> getAllBlocks() {
        return scheduleRepository.findAll();
    }

    public List<RecurringScheduleBlock> getBlocksForDay(Long userId, DayOfWeek day) {
        return scheduleRepository.findByUserIdAndDayOfWeek(userId, day);
    }

    public RecurringScheduleBlock updateBlock(Long id, RecurringScheduleBlock updatedBlock) {
        RecurringScheduleBlock existing = scheduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Recurring block not found with id: " + id));

        Long userId = existing.getUser().getId();

        validateBlock(userId, updatedBlock, id);

        existing.setTitle(updatedBlock.getTitle());
        existing.setDayOfWeek(updatedBlock.getDayOfWeek());
        existing.setStartTime(updatedBlock.getStartTime());
        existing.setEndTime(updatedBlock.getEndTime());
        existing.setColor(updatedBlock.getColor());

        return scheduleRepository.save(existing);
    }

    public void deleteBlock(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new IllegalArgumentException("Recurring block not found with id: " + id);
        }

        scheduleRepository.deleteById(id);
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
    }

    private void validateBlock(Long userId, RecurringScheduleBlock block, Long ignoredId) {
        if (block.getTitle() == null || block.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Empty title is not accepted");
        }

        if (block.getDayOfWeek() == null) {
            throw new IllegalArgumentException("Day of week is required");
        }

        if (block.getStartTime() == null || block.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time are required");
        }

        if (!block.getStartTime().isBefore(block.getEndTime())) {
            throw new IllegalArgumentException("Invalid start and end times");
        }

        List<RecurringScheduleBlock> sameDayBlocks =
                scheduleRepository.findByUserIdAndDayOfWeek(userId, block.getDayOfWeek());

        for (RecurringScheduleBlock existing : sameDayBlocks) {
            if (ignoredId != null && existing.getId().equals(ignoredId)) {
                continue;
            }

            boolean overlaps =
                    block.getStartTime().isBefore(existing.getEndTime()) &&
                            block.getEndTime().isAfter(existing.getStartTime());

            if (overlaps) {
                throw new IllegalArgumentException("New block overlaps with existing block");
            }
        }
    }
}