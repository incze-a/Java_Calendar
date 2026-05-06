package SD.nCalendar.repository;

import SD.nCalendar.model.OneTimeEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OneTimeEventRepository
        extends JpaRepository<OneTimeEvent, Long> {

    List<OneTimeEvent> findByDate(LocalDate date);
    List<OneTimeEvent> findByUserIdAndDate(Long userId, LocalDate date);
}
