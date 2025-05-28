package com.example.demo_case_crm.service.implementation;

import com.example.demo_case_crm.dto.ClaimDTO;
import com.example.demo_case_crm.dto.DocumentDTO;
import com.example.demo_case_crm.entity.Claim;
import com.example.demo_case_crm.entity.Document;
import com.example.demo_case_crm.exception.ResourceNotFoundException;
import com.example.demo_case_crm.mapper.ClaimMapper;
import com.example.demo_case_crm.mapper.DocumentMapper;
import com.example.demo_case_crm.repository.ClaimRepository;
import com.example.demo_case_crm.repository.DocumentRepository;
import com.example.demo_case_crm.service.DocumentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private DocumentRepository documentRepository;
    private ClaimRepository claimRepository;

    @Override
    public List<DocumentDTO> getAll() {
        List<Document> documents = documentRepository.findAll();
        return doDTOsList(documents);
    }
    @Override
    public void save(DocumentDTO documentDTO) {

        Document document = DocumentMapper.toEntity(documentDTO, new Document());

        int claimId = documentDTO.getClaimDTO().getId();
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim", "id", Integer.toString(claimId)));

        document.setClaim(claim);


        document.setCreatedAt(LocalDateTime.now());

        documentRepository.save(document);


    }


    @Override
    public DocumentDTO getById(int id) {
        Document document = documentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Document", "id", Integer.toString(id))
        );
        DocumentDTO documentDTO = DocumentMapper.toDTO(document, new DocumentDTO());
        if(claimRepository.findByDocumentsId(document.getId()).isPresent()){
            Claim claim = claimRepository.findByDocumentsId(document.getId()).get();
            documentDTO.setClaimDTO(ClaimMapper.toDTO(claim, new ClaimDTO()));
        }
        return documentDTO;
    }

    @Override
    public void update(DocumentDTO documentDTO) {

        Document existingDocument = documentRepository.findById(documentDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Document", "id", Integer.toString(documentDTO.getId())));

        existingDocument.setName(documentDTO.getName());
        existingDocument.setText(documentDTO.getText());
        existingDocument.setUpdatedAt(LocalDateTime.now());


        int claimId = documentDTO.getClaimDTO().getId();
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim", "id", Integer.toString(claimId)));

        // Оновлення зв'язку з Claim
        existingDocument.setClaim(claim);

        // Збереження оновленого документа
        documentRepository.save(existingDocument);

        System.out.println("Document updated successfully.");

    }

    @Override
    public void deleteById(int id) {
        Document document = documentRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Document", "id", Integer.toString(id))
        );
        documentRepository.delete(document);
    }

    @Override
    public List<DocumentDTO> getDocumentsByClaimId(int claimId) {
        List<Document> documents = documentRepository.findByClaimId(claimId);
        return doDTOsList(documents);
    }

    private List<DocumentDTO> doDTOsList(List<Document> documents) {
        List<DocumentDTO> documentDTOS = new ArrayList<>();
        for (Document document : documents) {
            DocumentDTO documentDTO = DocumentMapper.toDTO(document, new DocumentDTO());
            if(claimRepository.findByDocumentsId(document.getId()).isPresent()){
                Claim claim = claimRepository.findByDocumentsId(document.getId()).get();
                documentDTO.setClaimDTO(ClaimMapper.toDTO(claim, new ClaimDTO()));
            }
            documentDTOS.add(documentDTO);
        }
        return documentDTOS;
    }

    @Override
    public DocumentDTO getByClaimIdAndDocumentId(int claimId, int id) {
        Document document = documentRepository.findByClaimIdAndId(claimId,id).orElseThrow(
                () -> new ResourceNotFoundException("Document", "id", Integer.toString(id))
        );
        DocumentDTO documentDTO = DocumentMapper.toDTO(document, new DocumentDTO());
        if(claimRepository.findByDocumentsId(document.getId()).isPresent()){
            Claim claim = claimRepository.findByDocumentsId(document.getId()).get();
            documentDTO.setClaimDTO(ClaimMapper.toDTO(claim, new ClaimDTO()));
        }
        return documentDTO;
    }

    @Override
    public void createInClaim(DocumentDTO documentDTO, int claimId) {
        Document document = DocumentMapper.toEntity(documentDTO, new Document());
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim", "id", Integer.toString(claimId)));
        document.setClaim(claim);
        document.setCreatedAt(LocalDateTime.now());
        documentRepository.save(document);
    }
}
