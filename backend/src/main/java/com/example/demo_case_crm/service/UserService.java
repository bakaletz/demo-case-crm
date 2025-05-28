package com.example.demo_case_crm.service;

import com.example.demo_case_crm.dto.UserDTO;
import java.util.List;

public interface UserService {
    List<UserDTO> getAll();

    UserDTO getById(int id);

    void update(UserDTO userDTO);
}
