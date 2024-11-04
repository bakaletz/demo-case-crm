package com.example.demo_case_crm.controller;

import com.example.demo_case_crm.entity.Claim;
import com.example.demo_case_crm.service.ClaimService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/claim")
public class ClaimController {

    private ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @GetMapping
    public List<Claim> getAll(){
        return claimService.getAll();
    }
}
