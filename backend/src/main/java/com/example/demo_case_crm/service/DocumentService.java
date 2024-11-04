package com.example.demo_case_crm.service;

import com.example.demo_case_crm.entity.Document;

import java.util.List;
import java.util.Optional;

public interface DocumentService {
    List<Document> getAll();

    Document save(Document document);

    Optional<Document> getById(int id);
}
