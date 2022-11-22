package com.tahiti.snakePuzzle.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.tahiti.snakePuzzle.exception.CombinationNotFoundException;

@ControllerAdvice
public class SnakePuzzleControllerHandler {

    @ResponseBody
    @ExceptionHandler(CombinationNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    String employeeNotFoundHandler(CombinationNotFoundException ex) {
        return ex.getMessage();
    }

}
