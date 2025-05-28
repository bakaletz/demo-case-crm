package com.example.demo_case_crm.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserDTO {
    private int id;

    @NotNull(message = "First name is required")
    @Size(min=2,max=30, message="First name should have at least 2 characters and maximum 30")
    private String firstName;

    @NotNull(message = "Last name is required")
    @Size(min=2,max=30, message="Last name should have at least 2 characters and maximum 30")
    private String lastName;

    @Email(message = "Invalid email address")
    @NotNull(message = "Email is required")
    private String email;


    @NotNull(message = "Phone number is required")
    private String phone;

}
