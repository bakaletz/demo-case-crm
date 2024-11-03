package com.example.demo_case_crm.repository;

import com.example.demo_case_crm.entity.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaseRepository extends JpaRepository<Case,Integer> {
}
