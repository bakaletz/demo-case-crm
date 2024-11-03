package com.example.demo_case_crm.controller;

import com.example.demo_case_crm.entity.Case;
import com.example.demo_case_crm.service.CaseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/case")
public class CaseController {

    private CaseService caseService;

    public CaseController(CaseService caseService) {
        this.caseService = caseService;
    }

    @GetMapping
    public List<Case> getAll(){
        return caseService.getAll();
    }
}
