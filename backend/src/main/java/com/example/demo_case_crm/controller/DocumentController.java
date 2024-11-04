package com.example.demo_case_crm.controller;

import com.example.demo_case_crm.entity.Document;
import com.example.demo_case_crm.service.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/documents")
public class DocumentController {

    private DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<Document> getAll(){
        return documentService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable int id) {
        Optional<Document> document = documentService.getById(id);
        return document.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        Document createdDocument = documentService.save(document);

        // Повертаємо новостворений документ разом зі статусом 201 Created
        return new ResponseEntity<>(createdDocument, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable int id, @RequestBody Document document) {
        // Переконуємося, що ID документа відповідає ID в шляху
        if (document.getId() != id) {
            return ResponseEntity.badRequest().build();
        }
        try {
            Document updatedDocument = documentService.update(document);
            return ResponseEntity.ok(updatedDocument);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable int id) {
        if (documentService.getById(id).isPresent()) {
            documentService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
