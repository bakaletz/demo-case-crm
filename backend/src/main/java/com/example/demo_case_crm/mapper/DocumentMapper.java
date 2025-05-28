package com.example.demo_case_crm.mapper;

import com.example.demo_case_crm.dto.DocumentDTO;
import com.example.demo_case_crm.entity.Document;

public class DocumentMapper {
    private DocumentMapper(){}

    public static DocumentDTO toDTO(Document document, DocumentDTO documentDTO) {
        documentDTO.setId(document.getId());
        documentDTO.setName(document.getName());
        documentDTO.setText(document.getText());
        return documentDTO;
    }

    public static Document toEntity(DocumentDTO documentDTO, Document document) {
        document.setId(documentDTO.getId());
        document.setName(documentDTO.getName());
        document.setText(documentDTO.getText());
        return document;
    }
}
