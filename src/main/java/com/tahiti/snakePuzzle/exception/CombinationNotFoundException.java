package com.tahiti.snakePuzzle.exception;

import java.util.Optional;

public class CombinationNotFoundException extends RuntimeException {

    public CombinationNotFoundException() {
        super("La récupération de la combinaison en base de données à échouée");

    }

    public CombinationNotFoundException(Optional<String> combinaison) {
        super("La récupération de la combinaison" + combinaison + "en base de données à échouée");

    }

}
