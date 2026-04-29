package com.buap.sgatd.backend.controller;

import com.buap.sgatd.backend.model.TareaDB;
import com.buap.sgatd.backend.repository.TareaRepository;

// Importaciones del modelo (POJO en lugar de EMF ya que el jar no tiene ModelFactory)
import com.buap.sgatd.model.Tarea;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*") // Crucial para permitir peticiones desde el frontend HTML
public class TareaController {

    @Autowired
    private TareaRepository tareaRepository;

    @GetMapping
    public List<TareaDB> obtenerTodasLasTareas() {
        return tareaRepository.findAll();
    }

    @PostMapping
    public TareaDB crearTarea(@RequestBody TareaDB nuevaTareaWeb) {
        
        // --- 1. USO DEL MODELO ---
        Tarea tareaEMF = new Tarea();
        tareaEMF.setId(UUID.randomUUID().toString());
        tareaEMF.setTitle(nuevaTareaWeb.getTitle());
        tareaEMF.setDescription(nuevaTareaWeb.getDescription());
        tareaEMF.setPriority(nuevaTareaWeb.getPriority());
        
        // --- 2. MAPEO A ENTIDAD JPA PARA PERSISTENCIA ---
        nuevaTareaWeb.setId(tareaEMF.getId());
        nuevaTareaWeb.setTitle(tareaEMF.getTitle());
        nuevaTareaWeb.setDescription(tareaEMF.getDescription());
        nuevaTareaWeb.setCompleted(false);
        
        return tareaRepository.save(nuevaTareaWeb);
    }

    @DeleteMapping("/{id}")
    public void eliminarTarea(@PathVariable String id) {
        tareaRepository.deleteById(id);
    }

    @DeleteMapping("/all")
    public void eliminarTodasLasTareas() {
        tareaRepository.deleteAll();
    }

    @PutMapping("/{id}")
    public TareaDB actualizarTarea(@PathVariable String id, @RequestBody TareaDB tareaActualizada) {
        return tareaRepository.findById(id).map(tarea -> {
            tarea.setTitle(tareaActualizada.getTitle());
            tarea.setDescription(tareaActualizada.getDescription());
            tarea.setPriority(tareaActualizada.getPriority());
            tarea.setDueDate(tareaActualizada.getDueDate());
            if (tareaActualizada.getCompleted() != null) {
                tarea.setCompleted(tareaActualizada.getCompleted());
            }
            return tareaRepository.save(tarea);
        }).orElseGet(() -> {
            tareaActualizada.setId(id);
            if (tareaActualizada.getCompleted() == null) {
                tareaActualizada.setCompleted(false);
            }
            return tareaRepository.save(tareaActualizada);
        });
    }
}
