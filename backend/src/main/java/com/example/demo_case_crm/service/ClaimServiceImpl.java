package com.example.demo_case_crm.service;


import com.example.demo_case_crm.entity.Claim;
import com.example.demo_case_crm.repository.ClaimRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimServiceImpl implements ClaimService {

    private ClaimRepository claimRepository;

    public ClaimServiceImpl(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    @Override
    public List<Claim> getAll() {
        return claimRepository.findAll();
    }
}
