package com.example.demo_case_crm.mapper;

import com.example.demo_case_crm.dto.ClaimDTO;
import com.example.demo_case_crm.entity.Claim;

public class ClaimMapper {

    private ClaimMapper(){
    }

    public static ClaimDTO toDTO (Claim claim,ClaimDTO claimDTO){
        claimDTO.setId(claim.getId());
        claimDTO.setName(claim.getName());
        claimDTO.setDescription(claim.getDescription());
        claimDTO.setDeadline(claim.getDeadline());
        claimDTO.setStatus(claim.getStatus());
        return claimDTO;
    }

    public static Claim toEntity(ClaimDTO claimDTO, Claim claim) {
        claim.setName(claimDTO.getName());
        claim.setDescription(claimDTO.getDescription());
        claim.setDeadline(claimDTO.getDeadline());
        claim.setStatus(claimDTO.getStatus());
        return claim;
    }
}
