package com.example.demo_case_crm.service;

import com.example.demo_case_crm.dto.ClaimDTO;
import com.example.demo_case_crm.dto.UserDTO;
import com.example.demo_case_crm.entity.Claim;
import com.example.demo_case_crm.entity.User;
import com.example.demo_case_crm.exception.ResourceNotFoundException;
import com.example.demo_case_crm.mapper.ClaimMapper;
import com.example.demo_case_crm.mapper.UserMapper;
import com.example.demo_case_crm.repository.ClaimRepository;
import com.example.demo_case_crm.repository.UserRepository;
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
        claim.setCreatedAt(LocalDateTime.now());
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

