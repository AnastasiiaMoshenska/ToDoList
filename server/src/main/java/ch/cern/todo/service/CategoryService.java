package ch.cern.todo.service;

import ch.cern.todo.persistence.model.Category;

public interface CategoryService {
    Iterable<Category> getCategories();
}
