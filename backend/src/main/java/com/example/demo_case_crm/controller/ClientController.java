package com.example.demo_case_crm.controller;

import com.example.demo_case_crm.dto.ClientDTO;
import com.example.demo_case_crm.dto.ResponseDTO;
import com.example.demo_case_crm.service.ClientService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clients")
@AllArgsConstructor
@Validated
public class ClientController {

    private ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        List<ClientDTO> clientDTOS = clientService.getAll();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(clientDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable int id) {
        ClientDTO clientDTO = clientService.getById(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(clientDTO);
    }

    @PostMapping
    public ResponseEntity<ResponseDTO> createClient(@Valid @RequestBody ClientDTO clientDTO) {
        clientService.save(clientDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDTO(HttpStatus.CREATED, "Client created"));
    }

    @PutMapping
    public ResponseEntity<ResponseDTO> updateClient(@Valid @RequestBody ClientDTO clientDTO) {
        clientService.update(clientDTO);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDTO(HttpStatus.OK, "Client updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO> deleteClient(@PathVariable int id) {
        clientService.deleteById(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDTO(HttpStatus.OK, "Client deleted"));
    }
}
