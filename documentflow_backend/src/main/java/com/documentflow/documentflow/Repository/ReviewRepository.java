package com.documentflow.documentflow.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.documentflow.documentflow.Entity.Document;
import com.documentflow.documentflow.Entity.Review;
import java.util.List;


@Repository
public interface ReviewRepository extends JpaRepository<Review,Long>{
    List<Review> findByDocument(Document document);
}
