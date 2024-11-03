package com.example.demo_case_crm.repository;

import com.example.demo_case_crm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}
