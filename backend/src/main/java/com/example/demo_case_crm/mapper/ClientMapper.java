package com.example.demo_case_crm.mapper;

import com.example.demo_case_crm.dto.ClientDTO;
import com.example.demo_case_crm.entity.Client;

public class ClientMapper {

    private ClientMapper() {

    }

    public static ClientDTO toDTO(Client client, ClientDTO clientDTO){
        clientDTO.setId(client.getId());
        clientDTO.setFirstName(client.getFirstName());
        clientDTO.setLastName(client.getLastName());
        clientDTO.setEmail(client.getEmail());
        clientDTO.setPhone(client.getPhone());
        clientDTO.setContactInfo(client.getContactInfo());
        clientDTO.setAdditionalInfo(client.getAdditionalInfo());
        clientDTO.setStatus(client.getStatus());
        return clientDTO;
    }

    public static Client toEntity(ClientDTO clientDTO, Client client) {
        client.setId(clientDTO.getId());
        client.setFirstName(clientDTO.getFirstName());
        client.setLastName(clientDTO.getLastName());
        client.setEmail(clientDTO.getEmail());
        client.setPhone(clientDTO.getPhone());
        client.setContactInfo(clientDTO.getContactInfo());
        client.setAdditionalInfo(clientDTO.getAdditionalInfo());
        client.setStatus(clientDTO.getStatus());
        return client;
    }
}
