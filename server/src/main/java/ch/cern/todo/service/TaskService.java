package ch.cern.todo.service;

import ch.cern.todo.persistence.model.Task;

public interface TaskService {
    Iterable<Task> getTasks();
    Task addTask(Task task);
    void deleteTask(int taskId);
    void updateTask(Task task);
}
