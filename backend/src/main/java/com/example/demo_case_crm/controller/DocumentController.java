package com.example.demo_case_crm.controller;

import com.example.demo_case_crm.dto.DocumentDTO;
import com.example.demo_case_crm.dto.ResponseDTO;
import com.example.demo_case_crm.service.DocumentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
@AllArgsConstructor
@Validated
public class DocumentController {

    private DocumentService documentService;



    @GetMapping
    public ResponseEntity<List<DocumentDTO>> getAllDocuments(){
        List<DocumentDTO> documentDTOS = documentService.getAll();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(documentDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDTO> getDocumentById(@PathVariable int id) {
        DocumentDTO documentDTO = documentService.getById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(documentDTO);
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> createDocument(@Valid @RequestBody DocumentDTO documentDTO) {
        documentService.save(documentDTO);
        return  ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDTO(HttpStatus.CREATED,"Document created"));
    }
    @PutMapping
    public ResponseEntity<ResponseDTO> updateDocument(@Valid @RequestBody DocumentDTO documentDTO) {

        documentService.update(documentDTO);
        // Переконуємося, що ID документа відповідає ID в шляху
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDTO(HttpStatus.OK, "Document updated Successfully"));

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO> deleteDocument(@PathVariable int id) {

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDTO(HttpStatus.OK, "Document deleted Successfully"));

    }



}
