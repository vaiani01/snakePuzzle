package com.tahiti.snakePuzzle.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tahiti.snakePuzzle.dto.CombinationDto;
import com.tahiti.snakePuzzle.entity.Combination;
import com.tahiti.snakePuzzle.exception.CombinationNotFoundException;

import com.tahiti.snakePuzzle.repository.SnakePuzzleRepository;

@Service
public class SnakePuzzleServiceImpl {

    private Integer[] NUMBER_ARRAY = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    private static Logger LOGGER = LoggerFactory.getLogger(SnakePuzzleServiceImpl.class);

    final private SnakePuzzleRepository repository;

    public SnakePuzzleServiceImpl(SnakePuzzleRepository repository) {
        this.repository = repository;
    }

    /**
     * Generate all combination and return one
     * 
     * @param combination combination still displayed by frontend if exist
     * @throws Exception
     */
    public CombinationDto postCombinations(final Optional<String> combination) throws Exception {

        try {
            ArrayList<CombinationDto> combinations = new ArrayList<>();

            // GET combinations from Database if exists
            List<Combination> dbCombinations = repository.findAll();

            if (dbCombinations.size() > 0) {
                // MAP to DTO
                combinations.addAll(dbCombinations.stream()
                        .map(dbCombi -> new CombinationDto(dbCombi.getId(), dbCombi.getNumbers())).toList());
                // returns random combination
                return selectRandomCombination(combination, combinations);
            } else {

                List<String> computedCombinations = new ArrayList<>();
                // if no combination found in Database - load computation
                swapAllRecursive(9, NUMBER_ARRAY, computedCombinations);

                // Map combinations to combination entity list
                final List<Combination> mappedCombinations = computedCombinations.stream()
                        .map(numbers -> new Combination(numbers)).toList();

                // SAVE ALL combinations in Database
                dbCombinations.addAll(repository.saveAll(mappedCombinations));

                // Map to DTO
                combinations.addAll(dbCombinations.stream()
                        .map(dbCombi -> new CombinationDto(dbCombi.getId(), dbCombi.getNumbers())).toList());

                // return random combination
                return selectRandomCombination(combination, combinations);
            }
        } catch (

        Exception e) {
            // throw CombinaisonNotFoundException exception if combination has not been
            // fetched
            throw new CombinationNotFoundException();
        }

    }

    private CombinationDto selectRandomCombination(final Optional<String> combination,
            List<CombinationDto> combinations) {

        if (combination.isPresent()) {
            List<CombinationDto> filteredList = combinations.stream()
                    .filter((item -> !item.getCombination().equals(combination.get())))
                    .toList();

            return combinations.get(new Random().nextInt(filteredList.size()));

        } else {
            return combinations.get(new Random().nextInt(combinations.size()));
        }
    }

    /**
     * Updata Db with combination given in parameter
     * 
     * @param combination combination given by frontend
     */
    public void updateCombinations(final String combination) {
        try {
            repository.save(new Combination(combination));
        } catch (Exception e) {
            LOGGER.warn("Update can not be done");
        }

    }

    /**
     * Delete combination with co
     * 
     * @param combination combination given by frontend
     */
    public void deleteCombination(Long id) {

        repository.deleteById(id);

    }

    public void deleteAllCombinations() {
        repository.deleteAll();

    }

    private static boolean checkComputation(Integer[] input) {

        BigDecimal result = new BigDecimal(input[0])
                .add(new BigDecimal(13 * (double) input[1] / input[2]))
                .add(new BigDecimal(input[3]))
                .add(new BigDecimal(12 * input[4]))
                .subtract(new BigDecimal(input[5]))
                .subtract(new BigDecimal(11))
                .add(new BigDecimal(input[6] * (double) input[7] / input[8]))
                .subtract(new BigDecimal(10));

        double doubleValue = result.doubleValue();

        return doubleValue == 66;
    }

    private static void fillArray(Integer[] input, List<String> combinations) {
        if (checkComputation(input)) {
            if (combinations.size() < 128) {

                final String key = Arrays.asList(input).stream()
                        .map(String::valueOf)
                        .collect(Collectors.joining(","));
                combinations.add(key);
            } else {
                return;
            }
        }
    }

    private static void swap(Integer[] input, Integer a, int b) {
        int tmp = input[a];
        input[a] = input[b];
        input[b] = tmp;
    }

    private static void swapAllRecursive(
            int n, Integer[] elements, List<String> combinations) {

        if (n == 1) {
            fillArray(elements, combinations);
        } else {
            for (int i = 0; i < n - 1; i++) {
                swapAllRecursive(n - 1, elements, combinations);
                if (n % 2 == 0) {
                    swap(elements, i, n - 1);
                } else {
                    swap(elements, 0, n - 1);
                }
            }
            swapAllRecursive(n - 1, elements, combinations);
        }
    }

}
