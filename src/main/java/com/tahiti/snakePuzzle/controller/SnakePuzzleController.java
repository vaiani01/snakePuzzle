package com.tahiti.snakePuzzle.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tahiti.snakePuzzle.service.SnakePuzzleServiceImpl;

@RestController
@CrossOrigin
public class SnakePuzzleController {

    private SnakePuzzleServiceImpl service;

    SnakePuzzleController(SnakePuzzleServiceImpl service) {
        this.service = service;
    }

    @PostMapping(value = { "api/snake-puzzle/combinations", "api/snake-puzzle/combinations/{combination}" })
    ResponseEntity<String> loadCombination(@PathVariable(required = false) Optional<String> combination) {
        String result = service.postCombinations(combination);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
