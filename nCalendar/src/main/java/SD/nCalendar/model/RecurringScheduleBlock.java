package SD.nCalendar.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
public class RecurringScheduleBlock extends TimeBlock{
    private DayOfWeek dayOfWeek;

    public RecurringScheduleBlock() {}

    public RecurringScheduleBlock(Long id, String title, LocalTime startTime, LocalTime endTime, String color, DayOfWeek dayOfWeek, User user) {
        super(id, title, startTime, endTime, color, user);
        this.dayOfWeek=dayOfWeek;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}
