package com.example.demo_case_crm.service.implementation;

import com.example.demo_case_crm.dto.ClientDTO;
import com.example.demo_case_crm.entity.Client;
import com.example.demo_case_crm.exception.ResourceAlreadyExists;
import com.example.demo_case_crm.exception.ResourceNotFoundException;
import com.example.demo_case_crm.mapper.ClientMapper;
import com.example.demo_case_crm.repository.ClientRepository;
import com.example.demo_case_crm.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {

    private ClientRepository clientRepository;

    @Override
    public List<ClientDTO> getAll() {
        List<Client> clients = clientRepository.findAll();
        List<ClientDTO> clientDTOs = new ArrayList<>();
        for (Client client : clients) {
                  ClientDTO clientDTO = ClientMapper.toDTO(client, new ClientDTO());
                  clientDTOs.add(clientDTO);
              }

        return clientDTOs;
    }

    @Override
    public ClientDTO getById(int id) {
        Client client = clientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Client", "id", Integer.toString(id)));

        ClientDTO clientDTO = ClientMapper.toDTO(client, new ClientDTO());
        return clientDTO;
    }

    @Override
    public void save(ClientDTO clientDTO) {
        if(clientRepository.findByEmail(clientDTO.getEmail()).isPresent()){
            throw new ResourceAlreadyExists("Client", "email", clientDTO.getEmail());
        }
        else if(clientRepository.findByPhone(clientDTO.getPhone()).isPresent()){
            throw new ResourceAlreadyExists("Client", "phone", clientDTO.getPhone());
        }

        Client client = ClientMapper.toEntity(clientDTO, new Client());
        client.setCreatedAt(LocalDateTime.now());

        clientRepository.save(client);
    }

    @Override
    public void update(ClientDTO clientDTO) {
        Client client = clientRepository.findById(clientDTO.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Client", "id", Integer.toString(clientDTO.getId())));

        ClientMapper.toEntity(clientDTO, client);
        client.setUpdatedAt(LocalDateTime.now());

        clientRepository.save(client);
    }

    @Override
    public void deleteById(int id) {
        Client client = clientRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Client", "id", Integer.toString(id))
        );
        clientRepository.delete(client);
    }


}
