package com.example.demo_case_crm.mapper;

import com.example.demo_case_crm.dto.UserDTO;
import com.example.demo_case_crm.entity.User;

public class UserMapper {
    private UserMapper() {}

    public static UserDTO toDTO(User user,UserDTO userDTO) {
        userDTO.setId(user.getId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhone());
        return userDTO;
    }
    public static User toEntity(UserDTO userDTO,User user) {
        user.setId(userDTO.getId());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        return user;
    }
}
