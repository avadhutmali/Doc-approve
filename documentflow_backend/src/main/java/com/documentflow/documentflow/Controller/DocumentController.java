package com.documentflow.documentflow.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.documentflow.documentflow.Entity.Document;
import com.documentflow.documentflow.Service.DocumentService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    
    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> upload(
        @RequestParam String title,
        @RequestParam String description,
        @RequestParam String fileUrl,
        @RequestParam String userName
    ) {
        Document document = documentService.uploaDocument(title, description, fileUrl, userName);
        return ResponseEntity.ok(document);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Document>> getDocumentsByUploader(@RequestParam String userName) {
        return ResponseEntity.ok(documentService.getDocumentByUser(userName));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Document>> gePendingDocuments() {
        return ResponseEntity.ok(documentService.getPendingDocuments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable Long id) {
        return ResponseEntity.ok(documentService.getDocumentById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocumentById(@PathVariable Long id){
        documentService.deleteDocumentById(id);

        return ResponseEntity.noContent().build();
    }
    
}
