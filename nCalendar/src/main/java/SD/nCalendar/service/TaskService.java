package SD.nCalendar.service;

import SD.nCalendar.model.Task;
import SD.nCalendar.model.User;
import SD.nCalendar.repository.TaskRepository;
import SD.nCalendar.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task addTask(Long userId, Task task) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        if (task.getText() == null || task.getText().trim().isEmpty()) {
            throw new IllegalArgumentException("Empty task is not accepted");
        }

        if (task.getDate() == null) {
            throw new IllegalArgumentException("Task date is required");
        }

        task.setUser(user);

        return taskRepository.save(task);
    }

    public List<Task> getTasksForDate(LocalDate date) {
        return taskRepository.findByDate(date);
    }

    public List<Task> getTasksForWeek(Long userId, LocalDate startDate) {
        LocalDate endDate = startDate.plusDays(6);

        return taskRepository.findByUserId(userId)
                .stream()
                .filter(task -> {
                    if (!task.isCompleted()) {
                        return true;
                    }

                    if (task.getDate() == null) {
                        return false;
                    }

                    return !task.getDate().isBefore(startDate)
                            && !task.getDate().isAfter(endDate);
                })
                .collect(Collectors.toList());
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found with id: " + id));

        if (updatedTask.getText() == null || updatedTask.getText().trim().isEmpty()) {
            throw new IllegalArgumentException("Empty task is not accepted");
        }

        existing.setText(updatedTask.getText());
        existing.setCompleted(updatedTask.isCompleted());

        return taskRepository.save(existing);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new IllegalArgumentException("Task not found with id: " + id);
        }

        taskRepository.deleteById(id);
    }
}