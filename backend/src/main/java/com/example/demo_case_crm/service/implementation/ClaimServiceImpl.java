package com.example.demo_case_crm.service.implementation;

import com.example.demo_case_crm.dto.ClaimDTO;
import com.example.demo_case_crm.dto.ClientDTO;
import com.example.demo_case_crm.dto.UserDTO;
import com.example.demo_case_crm.entity.Claim;
import com.example.demo_case_crm.entity.Client;
import com.example.demo_case_crm.entity.User;
import com.example.demo_case_crm.exception.ResourceNotFoundException;
import com.example.demo_case_crm.mapper.ClaimMapper;
import com.example.demo_case_crm.mapper.ClientMapper;
import com.example.demo_case_crm.mapper.UserMapper;
import com.example.demo_case_crm.repository.ClaimRepository;
import com.example.demo_case_crm.repository.ClientRepository;
import com.example.demo_case_crm.repository.UserRepository;
import com.example.demo_case_crm.service.ClaimService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class ClaimServiceImpl implements ClaimService {

    private ClaimRepository claimRepository;
    private UserRepository userRepository;
    private ClientRepository clientRepository;


    @Override
    public List<ClaimDTO> getAll() {
        List<Claim> claims = claimRepository.findAll();
        List<ClaimDTO> claimDTOList = new ArrayList<>();
        for (Claim claim : claims) {
            ClaimDTO claimDTO = ClaimMapper.toDTO(claim, new ClaimDTO());
            if(userRepository.findByClaimsId(claim.getId()).isPresent()) {
                User user = userRepository.findByClaimsId(claim.getId()).get();
                claimDTO.setUserDTO(UserMapper.toDTO(user, new UserDTO()));
            }
            if(clientRepository.findByClaimsId(claim.getId()).isPresent()) {
                Client client = clientRepository.findByClaimsId(claim.getId()).get();
                claimDTO.setClientDTO(ClientMapper.toDTO(client, new ClientDTO()));
            }
                claimDTOList.add(claimDTO);
            }
          return claimDTOList;

        }


    @Override
    public ClaimDTO getById(int id) {
        Claim claim = claimRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Claim", "id", Integer.toString(id))
        );
        ClaimDTO claimDTO = ClaimMapper.toDTO(claim, new ClaimDTO());
        if(userRepository.findByClaimsId(claim.getId()).isPresent()) {
            User user = userRepository.findByClaimsId(claim.getId()).get();
            claimDTO.setUserDTO(UserMapper.toDTO(user, new UserDTO()));
        }
        if(clientRepository.findByClaimsId(claim.getId()).isPresent()) {
            Client client = clientRepository.findByClaimsId(claim.getId()).get();
            claimDTO.setClientDTO(ClientMapper.toDTO(client, new ClientDTO()));
        }

        return claimDTO;
    }

    @Override
    public void create(ClaimDTO claimDTO) {
        Claim claim = ClaimMapper.toEntity(claimDTO, new Claim());
        if(claimDTO.getUserDTO() != null) {
            int userId = claimDTO.getUserDTO().getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", Integer.toString(userId)));

            UserDTO userDTO = claimDTO.getUserDTO();
            UserMapper.toEntity(userDTO, user);
            claim.setUser(user);

        }

        if(claimDTO.getClientDTO() != null) {
        int clientId = claimDTO.getClientDTO().getId();;
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Client", "id", Integer.toString(clientId)));
            ClientDTO clientDTO = claimDTO.getClientDTO();
            ClientMapper.toEntity(clientDTO,client);
            claim.setClient(client);
        }

        claim.setCreatedAt(LocalDateTime.now());
        claim.setStatus("Open");
        claimRepository.save(claim);
    }

    @Override
    public void update(ClaimDTO claimDTO) {
        Claim existingClaim = claimRepository.findById(claimDTO.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Claim", "id", Integer.toString(claimDTO.getId())));

        Claim claim = ClaimMapper.toEntity(claimDTO, existingClaim);

            if(claimDTO.getUserDTO() != null) {
                int userId = claimDTO.getUserDTO().getId();
                User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", Integer.toString(userId)));
                UserDTO userDTO = claimDTO.getUserDTO();
                UserMapper.toEntity(userDTO, user);
                 claim.setUser(user);
        }
        if(claimDTO.getClientDTO() != null) {
            int clientId = claimDTO.getClientDTO().getId();;
            Client client = clientRepository.findById(clientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Client", "id", Integer.toString(clientId)));
            ClientDTO clientDTO = claimDTO.getClientDTO();
            ClientMapper.toEntity(clientDTO,client);
            claim.setClient(client);
        }

            claim.setUpdatedAt(LocalDateTime.now());
            claimRepository.save(claim);
        }

    @Override
    public void deleteById(int id) {
        Claim claim = claimRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Claim", "id", Integer.toString(id)));
        claimRepository.delete(claim);
    }
}

