package ch.cern.todo.controller;

import ch.cern.todo.persistence.model.Task;
import ch.cern.todo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/tasks")
@CrossOrigin
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<Iterable<Task>> getTasks(){
        return ResponseEntity.ok().body(taskService.getTasks());
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        taskService.addTask(task);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value="/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable(name="id") int taskId){
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/{task}")
    public ResponseEntity<Task> updateTask(@RequestBody Task task){
        taskService.updateTask(task);
        return ResponseEntity.ok().build();
    }
}
