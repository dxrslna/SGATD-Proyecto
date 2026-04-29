package com.buap.sgatd.backend.repository;

import com.buap.sgatd.backend.model.TareaDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TareaRepository extends JpaRepository<TareaDB, String> {
}
