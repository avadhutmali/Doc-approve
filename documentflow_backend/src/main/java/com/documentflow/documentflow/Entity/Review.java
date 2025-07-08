package com.documentflow.documentflow.Entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.documentflow.documentflow.Entity.Enums.ReviewDecision;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Review {
    
    @Id
    @SequenceGenerator(
        name = "reviewSequence",
        sequenceName = "reviewSequence"
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "reviewSequence"
    )
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "document_id", nullable = false)
    private Document document;

    @ManyToOne()
    @JoinColumn(name = "reviewer_id", nullable = false)
    private User reviewer;
    
    @Enumerated
    @Column(nullable = false)
    private ReviewDecision decision;
    
    @Column(nullable = false)
    private String comment;

    @CreationTimestamp
    private LocalDateTime reviewAt;


}
