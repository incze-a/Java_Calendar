package SD.nCalendar.model;

import java.time.DayOfWeek;
import java.time.LocalTime;

public class RecurringScheduleBlock extends TimeBlock{
    private DayOfWeek dayOfWeek;

    public RecurringScheduleBlock() {}

    public RecurringScheduleBlock(Long id, String title, LocalTime startTime, LocalTime endTime, String color, DayOfWeek dayOfWeek) {
        super(id, title, startTime, endTime, color);
        this.dayOfWeek=dayOfWeek;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}
