package com.example.demo_case_crm.service;

import com.example.demo_case_crm.dto.DocumentDTO;
import java.util.List;

public interface DocumentService {
    List<DocumentDTO> getAll();

    void save(DocumentDTO documentDTO);

    DocumentDTO getById(int id);

    void update(DocumentDTO documentDTO);

    void deleteById(int id);
}
