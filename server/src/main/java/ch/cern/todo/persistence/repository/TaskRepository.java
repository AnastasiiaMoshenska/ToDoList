package ch.cern.todo.persistence.repository;

import ch.cern.todo.persistence.model.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer> {
}
