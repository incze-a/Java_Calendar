package SD.nCalendar.model;

import java.time.LocalTime;

public abstract class TimeBlock {
    private Long id;
    private String title;
    private LocalTime startTime;
    private LocalTime endTime;
    private String color;

    public TimeBlock() {}

    public TimeBlock(Long id, String title, LocalTime startTime, LocalTime endTime, String color) {
        this.id = id;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.color = color;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
