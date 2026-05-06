package SD.nCalendar.repository;

import SD.nCalendar.model.RecurringScheduleBlock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.List;

public interface RecurringScheduleBlockRepository
    extends JpaRepository<RecurringScheduleBlock, Long> {
        List<RecurringScheduleBlock> findByDayOfWeek(DayOfWeek dayOfWeek);
    List<RecurringScheduleBlock> findByUserIdAndDayOfWeek(Long userId, DayOfWeek dayOfWeek);
    }

