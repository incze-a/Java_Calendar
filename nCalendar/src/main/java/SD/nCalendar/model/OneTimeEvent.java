package SD.nCalendar.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class OneTimeEvent extends TimeBlock{
    private LocalDate date;

    public OneTimeEvent(Long id, String title, LocalTime startTime, LocalTime endTime, String color,LocalDate date, User user) {
        super(id, title, startTime, endTime, color, user);
        this.date = date;
    }

    public OneTimeEvent() {

    }


    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
}
