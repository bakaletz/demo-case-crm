package com.example.demo_case_crm.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {
    private int id;
    @NotNull
    @Size(min = 3, message = "First name must be at least 3 characters")
    private String firstName;
    @Size(min = 3, message = "Last name must be at least 3 characters")
    private String lastName;
    @Email(message = "Invalid email address")
    @NotNull(message = "Email is required")
    private String email;
    @NotNull(message = "Phone number is required")
    private String phone;
    private String contactInfo;
    private String additionalInfo;
    private String status;
}
