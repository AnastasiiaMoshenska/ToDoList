package ch.cern.todo.service;

import ch.cern.todo.persistence.model.Category;
import ch.cern.todo.persistence.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public Iterable<Category> getCategories() {
        return categoryRepository.findAll();
    }
}
