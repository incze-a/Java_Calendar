package SD.nCalendar.model;

import java.time.LocalDate;

public class Task {
    private Long id;
    private String text;
    private LocalDate date; //date added
    private LocalDate dateCompleted;
    private boolean completed;

    public Task(Long id, String text, LocalDate date, boolean completed, LocalDate dateCompleted) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.completed = completed;
        this.dateCompleted = dateCompleted;
    }

    public LocalDate getDateCompleted() {
        return dateCompleted;
    }

    public void setDateCompleted(LocalDate dateCompleted) {
        this.dateCompleted = dateCompleted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
