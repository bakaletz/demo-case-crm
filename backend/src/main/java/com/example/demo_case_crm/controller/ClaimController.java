package com.example.demo_case_crm.controller;

import com.example.demo_case_crm.dto.ClaimDTO;
import com.example.demo_case_crm.dto.DocumentDTO;
import com.example.demo_case_crm.dto.ResponseDTO;
import com.example.demo_case_crm.entity.Document;
import com.example.demo_case_crm.service.ClaimService;
import com.example.demo_case_crm.service.DocumentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/claims")
@AllArgsConstructor
@Validated
public class ClaimController {

    private ClaimService claimService;
    private DocumentService documentService;

    @GetMapping
    public ResponseEntity<List<ClaimDTO>> getAllClaims(){
        List<ClaimDTO> claimDTOList = claimService.getAll();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(claimDTOList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ClaimDTO> getClaimById(@PathVariable int id) {
        ClaimDTO claimDTO = claimService.getById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(claimDTO);
    }

    //NEED ONE MORE CHECK
    @PostMapping()
    public ResponseEntity<ResponseDTO> createClaim(@Valid @RequestBody ClaimDTO claimDTO) {
        claimService.create(claimDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDTO(HttpStatus.CREATED,"Claim created"));
    }

    @PutMapping()
    public ResponseEntity<ResponseDTO> updateClaim(@Valid @RequestBody ClaimDTO claimDTO) {
        claimService.update(claimDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDTO(HttpStatus.OK,"Claim updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO> deleteClaim(@PathVariable int id) {
        claimService.deleteById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDTO(HttpStatus.OK,"Claim deleted"));
    }

    //documentLogic
    @GetMapping("/{claimId}/documents")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByClaim(@PathVariable int claimId) {
        List<DocumentDTO> documents = documentService.getDocumentsByClaimId(claimId);
        return ResponseEntity.ok(documents);
    }
    @GetMapping("/{claimId}/documents/{id}")
    public ResponseEntity<DocumentDTO> getDocumentByClaimIdAndDocumentId(@PathVariable int claimId,@PathVariable int id) {
        DocumentDTO documentDTO = documentService.getByClaimIdAndDocumentId(claimId,id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(documentDTO);
    }
    @PostMapping("/{claimId}/documents")
    public ResponseEntity<ResponseDTO> createDocumentInClaims(@Valid @RequestBody DocumentDTO documentDTO,@PathVariable int claimId) {
        documentService.createInClaim(documentDTO,claimId);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDTO(HttpStatus.CREATED,"Document created"));
    }


}
