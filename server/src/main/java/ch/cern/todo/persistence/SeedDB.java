package ch.cern.todo.persistence;

import ch.cern.todo.persistence.model.Category;
import ch.cern.todo.persistence.repository.CategoryRepository;
import ch.cern.todo.persistence.repository.TaskRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class SeedDB {
    public TaskRepository taskRepository;
    public CategoryRepository categoryRepository;

    public SeedDB(TaskRepository taskRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    @PostConstruct
    public void init(){
        categoryRepository.save(new Category(1, "Home", "Something for home"));
        categoryRepository.save(new Category(2, "Animals", "Everything related to animals"));
        categoryRepository.save(new Category(3, "Shopping", "List of items to buy"));
        categoryRepository.save(new Category(4, "Work", "Work tasks"));
        categoryRepository.save(new Category(5, "Sport", "Sport classes"));
    }
}
