package com.tahiti.snakePuzzle.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class SnakePuzzleServiceImpl {

    Integer[] NUMBER_ARRAY = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

    /**
     * Generate all combinaison and return one
     * 
     * @param combinaison combinaison given by frontend if exist
     */
    public String postCombinations(final Optional<String> combinaison) {

        ArrayList<String> combinations = new ArrayList<>();

        swapAllRecursive(9, NUMBER_ARRAY, combinations);

        if (combinaison.isPresent()) {
            List<String> filteredList = combinations.stream().filter((item -> !item.equals(combinaison.get())))
                    .toList();
            return combinations.get(new Random().nextInt(filteredList.size()));

        } else {
            return combinations.get(new Random().nextInt(combinations.size()));
        }

    }

    /**
     * Updata Db with combinaison given in parameter
     * 
     * @param combinaison combinaison given by frontend
     */
    public void updateCombinations(final String combinaison) {

    }

    /**
     * Delete combinaison with co
     * 
     * @param combinaison combinaison given by frontend
     */
    public void deleteCombination(final String combinaison) {

    }

    public void deleteAllCombinations() {

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
