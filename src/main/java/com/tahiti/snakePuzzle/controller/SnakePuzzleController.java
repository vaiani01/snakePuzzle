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

    @PostMapping(value = { "/api/snake-puzzle/combinations", "/api/snake-puzzle/combinations/{combination}" })
    public ResponseEntity<CombinationDto> loadCombination(@PathVariable(required = false) Optional<String> combination)
            throws Exception {
        CombinationDto result = service.postCombinations(combination);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/api/snake-puzzle/combinations/{id}")
    public void deleteCombination(@PathVariable Long id) {
        service.deleteCombination(id);
    }

    @DeleteMapping("/api/snake-puzzle/combinations")
    public void deleteAllCombinations() {
        service.deleteAllCombinations();
    }

    @PutMapping("/api/snake-puzzle/combinations/{combination}")
    public void updateCombinations(@PathVariable(required = true) String combination) {
        service.updateCombinations(combination);
    }
}
