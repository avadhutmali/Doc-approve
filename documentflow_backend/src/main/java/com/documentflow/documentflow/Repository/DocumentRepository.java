package com.documentflow.documentflow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.documentflow.documentflow.Entity.Document;
import java.util.List;
import com.documentflow.documentflow.Entity.Enums.DocumentStatus;



@Repository
public interface DocumentRepository extends JpaRepository<Document,Long>{
    List<Document> findByUploadedByUserName(String username);
    List<Document> findByStatus(DocumentStatus status);
}

