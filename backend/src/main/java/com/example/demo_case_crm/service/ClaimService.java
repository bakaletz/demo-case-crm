package com.example.demo_case_crm.service;

import com.example.demo_case_crm.dto.ClaimDTO;
import java.util.List;

public interface ClaimService {
    List<ClaimDTO> getAll();

    ClaimDTO getById(int id);

    void create(ClaimDTO claimDTO);

    void update(ClaimDTO claimDTO);

    void deleteById(int id);
}
