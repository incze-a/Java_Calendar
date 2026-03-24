package SD.nCalendar.DTO;

public class TimeBlockDTO {
    private Long id;
    private String title;
    private String startTime;
    private String endTime;
    private String color;
    private String type; // RECURRING or EVENT

    public TimeBlockDTO(Long id, String title, String startTime, String endTime, String color, String type) {
        this.id = id;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.color = color;
        this.type = type;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getStartTime() { return startTime; }
    public String getEndTime() { return endTime; }
    public String getColor() { return color; }
    public String getType() { return type; }
}
