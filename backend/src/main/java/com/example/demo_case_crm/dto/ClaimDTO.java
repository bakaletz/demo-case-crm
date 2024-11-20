package com.example.demo_case_crm.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.LocalDateTime;


@Data
public class ClaimDTO {
    private int id;
    @NotNull(message = "Claim name is required")
    @Size(min = 3, message = "Claim name must be at least 3 characters")
    private String name;
    private String description;
    private LocalDateTime deadline;
    @NotEmpty(message = "Status is required")
    private String status;
    private UserDTO userDTO;
}
