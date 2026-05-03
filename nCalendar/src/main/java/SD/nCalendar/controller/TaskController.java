package SD.nCalendar.controller;

import SD.nCalendar.model.OneTimeEvent;
import SD.nCalendar.model.Task;
import SD.nCalendar.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @GetMapping("/week")
    public List<Task> getTasksForWeek(@RequestParam String startDate) {
        return taskService.getTasksForWeek(LocalDate.parse(startDate));
    }

    @GetMapping("/{date}")
    public List<Task> getTasks(@PathVariable String date) {
        return taskService.getTasksForDate(LocalDate.parse(date));
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task updatedTask
    ) {
        return taskService.updateTask(id, updatedTask);
    }

}
