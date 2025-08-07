package com.documentflow.documentflow.Service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.transaction.annotation.Transactional;

import com.documentflow.documentflow.Entity.Document;
import com.documentflow.documentflow.Entity.Enums.DocumentStatus;
import com.documentflow.documentflow.Entity.User;
import com.documentflow.documentflow.Repository.DocumentRepository;
import com.documentflow.documentflow.Repository.UserRepository;

@SpringBootTest
// ensures each test gets a fresh ApplicationContext (optional if you only have this one test)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@Transactional
class DocumentServiceTest {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DocumentRepository documentRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        // 1. Create and save a user with userName = "avadhut2"
        testUser = User.builder()
                       .userName("avadhut2")
                       .password("dummy")  // password & role just for DB constraints
                       .role("USER")
                       .build();
        userRepository.save(testUser);

        // 2. Create and save two documents for that user
        Document doc1 = Document.builder()
                                .title("First Doc")
                                .description("desc1")
                                .fileUrl("http://example.com/1")
                                .status(DocumentStatus.PENDING)
                                .uploadedBy(testUser)
                                .build();

        Document doc2 = Document.builder()
                                .title("Second Doc")
                                .description("desc2")
                                .fileUrl("http://example.com/2")
                                .status(DocumentStatus.APPROVED)
                                .uploadedBy(testUser)
                                .build();

        documentRepository.save(doc1);
        documentRepository.save(doc2);
    }

    @Test
    void whenValidUsername_thenReturnDocuments() {
        // Act
        List<Document> docs = documentService.getDocumentByUser("avadhut2");

        // Assert
        assertNotNull(docs, "Service should not return null");
        assertEquals(2, docs.size(), "Should find exactly 2 documents");

        // Verify contents
        assertTrue(
            docs.stream().anyMatch(d -> "First Doc".equals(d.getTitle())),
            "Must contain the first document"
        );
        assertTrue(
            docs.stream().anyMatch(d -> "Second Doc".equals(d.getTitle())),
            "Must contain the second document"
        );
    }

    @Test
    void whenUnknownUsername_thenReturnEmptyList() {
        // Act
        List<Document> docs = documentService.getDocumentByUser("nonexistent");

        // Assert
        assertNotNull(docs, "Service should return an empty list, not null");
        assertTrue(docs.isEmpty(), "Unknown usernames should yield no documents");
    }
}

