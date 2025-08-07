package com.documentflow.documentflow.Service;

import java.util.List;

import org.springframework.stereotype.Service;

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

    public Document uploaDocument(String title,String description,String fileUrl,String userName){
        User user = userRepository.findByUserName(userName).orElseThrow(()-> new EntityNotFoundException("User Not Found"));

        Document doc = Document.builder()
                        .title(title)
                        .description(description)
                        .fileUrl(fileUrl)
                        .status(DocumentStatus.PENDING)
                        .uploadedBy(user)
                        .build();
        return documentRepository.save(doc);
    }

    public List<Document> getDocumentByUser(String userName){
        return documentRepository.findByUploadedByUserName(userName);
    }

    public List<Document> getPendingDocuments(){
        return documentRepository.findByStatus(DocumentStatus.PENDING);
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
