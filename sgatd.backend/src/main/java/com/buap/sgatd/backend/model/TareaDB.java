package com.buap.sgatd.backend.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "tareas")
public class TareaDB {
    
    @Id
    private String id;
    private String title;
    private String description;
    private String priority;
    
    @Column(name = "due_date")
    private Date dueDate;
    
    private Boolean completed;

    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public Date getDueDate() { return dueDate; }
    public void setDueDate(Date dueDate) { this.dueDate = dueDate; }
    
    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}
