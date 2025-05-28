package com.example.demo_case_crm.service;

import com.example.demo_case_crm.dto.ClientDTO;

import java.util.List;

public interface ClientService {

    List<ClientDTO> getAll();

    ClientDTO getById(int id);

    void save(ClientDTO clientDTO);

    void update(ClientDTO clientDTO);

    void deleteById(int id);
}
