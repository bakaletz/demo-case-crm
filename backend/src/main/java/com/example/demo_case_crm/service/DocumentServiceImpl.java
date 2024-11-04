package com.example.demo_case_crm.service;

import com.example.demo_case_crm.entity.Document;
import com.example.demo_case_crm.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentServiceImpl implements DocumentService{

    private DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Override
    public List<Document> getAll() {
        return documentRepository.findAll();
    }

    @Override
    public Document save(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public Optional<Document> getById(int id) {
        return documentRepository.findById(id);
    }
}
