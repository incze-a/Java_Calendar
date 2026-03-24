package SD.nCalendar.mapper;

import SD.nCalendar.DTO.TimeBlockDTO;
import SD.nCalendar.model.OneTimeEvent;
import SD.nCalendar.model.RecurringScheduleBlock;
import SD.nCalendar.model.TimeBlock;

public class TimeBlockMapper {

    public static TimeBlockDTO toDTO(TimeBlock block) {
        String type;

        if(block instanceof RecurringScheduleBlock)
            type = "Recurring";
        else if (block instanceof OneTimeEvent)
            type = "Event";
        else type="Unknown";

        return new TimeBlockDTO(
                block.getId(),
                block.getTitle(),
                block.getStartTime().toString().substring(0,5),
                block.getEndTime().toString(),
                block.getColor(),
                type
        );
    }
}
