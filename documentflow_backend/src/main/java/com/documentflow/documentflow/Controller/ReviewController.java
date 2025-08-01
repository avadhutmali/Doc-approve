package com.documentflow.documentflow.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.documentflow.documentflow.Entity.Review;
import com.documentflow.documentflow.Service.ReviewService;

import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
@RequestMapping("api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/approve/{docId}")
    public ResponseEntity<Review> approveDocument(@PathVariable Long docId,@RequestParam String userName,@RequestParam String comment) {
        return ResponseEntity.ok(reviewService.approveDocument(docId, userName, comment));
    }

    @PostMapping("/reject/{docId}")
    public ResponseEntity<Review> rejectDocument(@PathVariable Long docId,@RequestParam String userName,@RequestParam String comment) {
        return ResponseEntity.ok(reviewService.rejectDocument(docId, userName, comment));
    }

    @GetMapping("/history/{docId}")
    public ResponseEntity<List<Review>> getHistory(@PathVariable Long docId) {
        return ResponseEntity.ok(reviewService.getReviewHistory(docId));
    }
    
}
