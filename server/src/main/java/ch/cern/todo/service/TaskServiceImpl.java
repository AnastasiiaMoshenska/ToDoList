package ch.cern.todo.service;

import ch.cern.todo.persistence.model.Task;
import ch.cern.todo.persistence.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Override
    public Iterable<Task> getTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task addTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(int id){
        if(taskRepository.existsById(id)){
            taskRepository.deleteById(id);
        }else{
            System.out.println("no task with the given id");
        }
    }

    @Override
    public void updateTask(Task task) {
        Task current = taskRepository.findById(task.getId()).orElseThrow(RuntimeException::new);
        current.setCategory(task.getCategory());
        current.setDeadline(task.getDeadline());
        current.setName(task.getName());
        current.setDescription(task.getDescription());
        current = taskRepository.save(current);
    }
}
