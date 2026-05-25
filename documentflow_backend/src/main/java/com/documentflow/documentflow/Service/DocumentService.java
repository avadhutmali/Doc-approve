package com.documentflow.documentflow.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.documentflow.documentflow.Entity.Document;
import com.documentflow.documentflow.Entity.Enums.DocumentStatus;
import com.documentflow.documentflow.Entity.User;
import com.documentflow.documentflow.Repository.DocumentRepository;
import com.documentflow.documentflow.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DocumentService {
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;

    public Document uploaDocument(String title,String description,String fileUrl,String userName,String reviewerUserName){
        if(reviewerUserName == null || reviewerUserName.isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reviewer username is required");
        }

        User user = userRepository.findByUserName(userName).orElseThrow(()-> new EntityNotFoundException("User Not Found"));
        User reviewer = userRepository.findByUserName(reviewerUserName).orElseThrow(()-> new EntityNotFoundException("Reviewer Not Found"));

        Document doc = Document.builder()
                        .title(title)
                        .description(description)
                        .fileUrl(fileUrl)
                        .status(DocumentStatus.PENDING)
                        .uploadedBy(user)
                        .assignedReviewer(reviewer)
                        .build();
        return documentRepository.save(doc);
    }

    public List<Document> getDocumentByUser(String userName){
        return documentRepository.findByUploadedByUserName(userName);
    }

    public List<Document> getPendingDocuments(String reviewerUserName){
        if(reviewerUserName == null || reviewerUserName.isBlank()){
            return documentRepository.findByStatus(DocumentStatus.PENDING);
        }

        return documentRepository.findByStatusAndAssignedReviewerUserName(DocumentStatus.PENDING, reviewerUserName);
    }

    public Document getDocumentById(Long id){
        return documentRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Document not found"));
    }

    public String deleteDocumentById(Long id){
        if(!documentRepository.existsById(id)){
            throw new EntityNotFoundException("Document not found");
        }
        documentRepository.deleteById(id);
        return "Deleted Succesfully";

    }
}
