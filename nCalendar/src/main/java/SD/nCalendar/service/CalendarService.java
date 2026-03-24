package SD.nCalendar.service;


import SD.nCalendar.DTO.DaySchedule;
import SD.nCalendar.DTO.TimeBlockDTO;
import SD.nCalendar.mapper.TimeBlockMapper;
import SD.nCalendar.model.TimeBlock;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class CalendarService { //build the actual calendar
    private final ScheduleService scheduleService;
    private final EventService eventService;

    public CalendarService(ScheduleService scheduleService, EventService eventService) {
        this.scheduleService = scheduleService;
        this.eventService = eventService;
    }

    public List<DaySchedule> getWeekSchedule(LocalDate startDate){
        List<DaySchedule> weekSchedule = new ArrayList<>();
        for(int i=0; i<7; i++) {
            LocalDate currentDate = startDate.plusDays(i);

            List<TimeBlockDTO> blockDTOs = new ArrayList<>();

// Recurring
            scheduleService.getBlocksForDay(currentDate.getDayOfWeek())
                    .forEach(block -> blockDTOs.add(TimeBlockMapper.toDTO(block)));

// Events
            eventService.getEventsForDate(currentDate)
                    .forEach(event -> blockDTOs.add(TimeBlockMapper.toDTO(event)));

// Sort
            blockDTOs.sort(Comparator.comparing(TimeBlockDTO::getStartTime));

            weekSchedule.add(new DaySchedule(currentDate, blockDTOs));
        }
        return weekSchedule;
    }
}
