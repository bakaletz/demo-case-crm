package com.example.demo_case_crm.controller;

import com.example.demo_case_crm.entity.Document;
import com.example.demo_case_crm.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/document")
public class DocumentController {

    private DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<Document> getAll(){
        return documentService.getAll();
    }
    @PostMapping
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        Document createdDocument = documentService.save(document);

        // Повертаємо новостворений документ разом зі статусом 201 Created
        return new ResponseEntity<>(createdDocument, HttpStatus.CREATED);
    }
}
