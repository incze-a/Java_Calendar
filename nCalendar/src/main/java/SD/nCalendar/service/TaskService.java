package SD.nCalendar.service;

import SD.nCalendar.model.OneTimeEvent;
import SD.nCalendar.model.Task;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final List<Task> tasks = new ArrayList<>();
    private Long idCounter=1L;

    public Task addTask(Task task){
        if (task.getText() == null || task.getText().trim().isEmpty()) {
            throw new IllegalArgumentException("Empty task is not accepted");
        }

        task.setId(++idCounter);
        tasks.add(task);
        return task;
    }

    public List<Task> getTasksForDate(LocalDate date) {
        return tasks.stream()
                .filter(e -> e.getDate() != null && e.getDate().equals(date))
                .collect(Collectors.toList());
    }

    public List<Task> getTasksForWeek(LocalDate startDate) {
        LocalDate endDate = startDate.plusDays(6);

        return tasks.stream()
                .filter(task -> {
                    // unfinished tasks always remain visible
                    if (!task.isCompleted()) {
                        return true;
                    }

                    // completed tasks only appear during their original week
                    if (task.getDate() == null) {
                        return false;
                    }

                    return !task.getDate().isBefore(startDate)
                            && !task.getDate().isAfter(endDate);
                })
                .collect(Collectors.toList());
    }

    public void deleteTask(Long id) {
        boolean removed = tasks.removeIf(task -> task.getId().equals(id));

        if (!removed) {
            throw new IllegalArgumentException("Task not found with id: " + id);
        }
    }

    public Task updateTask(Long id, Task updatedTask) {
        for (Task existing : tasks) {
            if (existing.getId().equals(id)) {
                existing.setText(updatedTask.getText());
                existing.setCompleted(updatedTask.isCompleted());
                return existing;
            }
        }
        throw new IllegalArgumentException("Task not found with id: " + id);
    }
}
