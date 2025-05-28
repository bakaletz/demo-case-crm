package com.example.demo_case_crm.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;



@Data
public class DocumentDTO {
    private int id;
    private ClaimDTO claimDTO;
    @NotNull(message = "Name is required")
    @Size(message = "Name should have at least 3 characters", min = 3)
    private String name;
    @NotNull(message = "Text is required")
    @Size(message = "Text should have at least 3 characters", min = 3)
    private String text;


}
