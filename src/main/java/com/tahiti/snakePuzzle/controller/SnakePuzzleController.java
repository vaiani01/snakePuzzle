package com.tahiti.snakePuzzle.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tahiti.snakePuzzle.dto.CombinationDto;
import com.tahiti.snakePuzzle.service.SnakePuzzleServiceImpl;

@RestController()
@CrossOrigin
public class SnakePuzzleController {

    private SnakePuzzleServiceImpl service;

    SnakePuzzleController(SnakePuzzleServiceImpl service) {
        this.service = service;
    }

    @PostMapping(value = { "/combinations", "/combinations/{combination}" })
    ResponseEntity<CombinationDto> loadCombination(@PathVariable(required = false) Optional<String> combination)
            throws Exception {
        CombinationDto result = service.postCombinations(combination);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/combinations/{id}")
    void deleteCombination(@PathVariable Long id) {
        service.deleteCombination(id);
    }

    @DeleteMapping("/combinations")
    void deleteAllCombinations() {
        service.deleteAllCombinations();
    }

    @PutMapping("/combinations/{combination}")
    void updateCombinations(@PathVariable(required = true) String combination) {
        service.updateCombinations(combination);
    }
}
