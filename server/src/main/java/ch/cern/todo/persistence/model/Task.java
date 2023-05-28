package ch.cern.todo.persistence.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name="TASKS")
public class Task {
    @NotNull
    @Id
    @Column(columnDefinition = "NUMBER")
    private int id;
    @NotNull
    @Column(columnDefinition = "VARCHAR2(100)")
    private String name;
    @Column(columnDefinition = "VARCHAR2(500)")
    private String description;
    @NotNull
    @Column(columnDefinition = "TIMESTAMP")
    private Timestamp deadline;
    @NotNull
    @ManyToOne
    @JoinColumn(name="CATEGORY_ID", referencedColumnName = "ID", nullable=false)
    private Category category;

    public Task() {
    }

    public Task(int id, String name, String description, Timestamp deadline, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getDeadline() {
        return deadline;
    }

    public void setDeadline(Timestamp deadline) {
        this.deadline = deadline;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return id == task.id && Objects.equals(name, task.name) && Objects.equals(description, task.description) && Objects.equals(deadline, task.deadline) && Objects.equals(category, task.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, deadline, category);
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", deadline=" + deadline +
                ", category='" + category + '\'' +
                '}';
    }
}
