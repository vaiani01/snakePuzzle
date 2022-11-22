package com.tahiti.snakePuzzle.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tahiti.snakePuzzle.entity.Combination;

public interface SnakePuzzleRepository extends JpaRepository<Combination, Long> {

    // String deleteCombinaisonByNumbers(String numbers);

}
