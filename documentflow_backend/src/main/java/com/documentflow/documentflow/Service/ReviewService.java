package com.documentflow.documentflow.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.documentflow.documentflow.Entity.Document;
import com.documentflow.documentflow.Entity.Review;
import com.documentflow.documentflow.Entity.User;
import com.documentflow.documentflow.Entity.Enums.DocumentStatus;
import com.documentflow.documentflow.Entity.Enums.ReviewDecision;
import com.documentflow.documentflow.Repository.DocumentRepository;
import com.documentflow.documentflow.Repository.ReviewRepository;
import com.documentflow.documentflow.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;

    public Review approveDocument(Long documentId,String reviewerUserName,String comment){
        return reviewDocument(documentId, reviewerUserName, comment, ReviewDecision.APPROVED);
    }
    public Review rejectDocument(Long documentId,String reviewerUserName,String comment){
        return reviewDocument(documentId, reviewerUserName, comment, ReviewDecision.REJECTED);
    }

    public Review reviewDocument(Long documentId,String reviewerUserName,String comment,ReviewDecision decision){
        if(reviewerUserName == null || reviewerUserName.isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reviewer username is required");
        }

        Document document = documentRepository.findById(documentId).orElseThrow(()-> new EntityNotFoundException("Document Not Found"));
        User reviewer = userRepository.findByUserName(reviewerUserName).orElseThrow(()-> new EntityNotFoundException("UserName not found"));

        if(document.getStatus() != DocumentStatus.PENDING){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Document is already reviewed");
        }

        if(document.getAssignedReviewer() == null || !document.getAssignedReviewer().getUserName().equals(reviewerUserName)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the assigned reviewer can review this document");
        }

        Review review = Review.builder()
                        .reviewer(reviewer)
                        .document(document)
                        .comment(comment)
                        .decision(decision)
                        .build();
        reviewRepository.save(review);

        if(decision == ReviewDecision.APPROVED){
            document.setStatus(DocumentStatus.APPROVED);
        }else{
            document.setStatus(DocumentStatus.REJECTED);
        }

        documentRepository.save(document);
        return review;
    }

    public List<Review> getReviewHistory(Long documentId){
        Document doc = documentRepository.findById(documentId).orElseThrow(()-> new EntityNotFoundException("Document Not Found"));

        return reviewRepository.findByDocument(doc);
    }
}
