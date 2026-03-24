package SD.nCalendar.model;

import java.time.LocalDate;
import java.time.LocalTime;

public class OneTimeEvent extends TimeBlock{
    private LocalDate date;


    public OneTimeEvent(Long id, String title, LocalTime startTime, LocalTime endTime, String color,LocalDate date) {
        super(id, title, startTime, endTime, color);
        this.date = date;
    }

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
}
