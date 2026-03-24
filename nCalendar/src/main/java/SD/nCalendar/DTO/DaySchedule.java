package SD.nCalendar.DTO;

import SD.nCalendar.model.TimeBlock;

import java.time.LocalDate;
import java.util.List;

public class DaySchedule {
    private LocalDate date;
    //private List<TimeBlock> blocks;
    private List<TimeBlockDTO> blocks;

    public DaySchedule(LocalDate date, List<TimeBlockDTO> blocks) {
        this.date = date;
        this.blocks = blocks;
    }
    public LocalDate getDate() {
        return date;
    }
    public List<TimeBlockDTO> getBlocks() {
        return blocks;
    }
}
