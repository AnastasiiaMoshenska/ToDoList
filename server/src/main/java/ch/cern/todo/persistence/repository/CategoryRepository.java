package ch.cern.todo.persistence.repository;

import ch.cern.todo.persistence.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
}
