package com.example.demo_case_crm.controller;

import com.example.demo_case_crm.dto.UserDTO;
import com.example.demo_case_crm.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;



    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        List<UserDTO> userDTOS =  userService.getAll();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userDTOS);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable int id){
        UserDTO userDTO =  userService.getById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userDTO);
    }
    @PutMapping("")
    public ResponseEntity<UserDTO> getUserById(@Valid @RequestBody UserDTO userDTO){
        userService.update(userDTO);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userDTO);
    }
}
