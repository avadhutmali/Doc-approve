package com.documentflow.documentflow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.documentflow.documentflow.Entity.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Long>{
    
}

