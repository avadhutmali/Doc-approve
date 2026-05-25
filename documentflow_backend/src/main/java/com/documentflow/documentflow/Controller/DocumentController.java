package com.documentflow.documentflow.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;

import com.documentflow.documentflow.Entity.Document;
import com.documentflow.documentflow.Service.DocumentService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    
    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<Document> upload(
        Authentication authentication,
        @RequestBody com.documentflow.documentflow.DTO.Document document
    ) {
        // determine authenticated username
        Object principal = authentication.getPrincipal();
        String authUserName;
        if (principal instanceof UserDetails) {
            authUserName = ((UserDetails) principal).getUsername();
        } else {
            authUserName = principal.toString();
        }

        boolean isAdmin = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ADMIN"));

        String uploaderUserName = document.getUserName();
        if (uploaderUserName == null || uploaderUserName.isBlank()) {
            uploaderUserName = authUserName;
        } else if (!uploaderUserName.equals(authUserName) && !isAdmin) {
            // only admins can upload on behalf of someone else
            return ResponseEntity.status(403).build();
        }

        Document documentUpload = documentService.uploaDocument(
            document.getTitle(),
            document.getDescription(),
            document.getFileUrl(),
            uploaderUserName,
            document.getReviewerUserName()
        );
        return ResponseEntity.ok(documentUpload);
    }

    @GetMapping("/username/{userName}")
    public ResponseEntity<List<Document>> getDocumentsByUploader(@PathVariable String userName) {
        return ResponseEntity.ok(documentService.getDocumentByUser(userName));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Document>> gePendingDocuments(@RequestParam(required = false) String reviewerUserName) {
        return ResponseEntity.ok(documentService.getPendingDocuments(reviewerUserName));
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
