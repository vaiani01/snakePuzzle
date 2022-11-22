export const SNAKE_TABLE_ALLOWED_VALUES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
] as const;

export const SNAKE_TABLE_PREFIX_KEY = "number-";

export const INVALID_COMBINAISON_MESSAGE =
  "Attention : votre solution doit contenir une seule fois le même chiffre dans l'intervalle de 1 à 9 !";

export const INVALID_COMPUTATION_MESSAGE =
  "Attention : votre calcul est erroné!";

export const SUCCESS_COMPUTATION_MESSAGE =
  "Félicitations : votre solution est validée et sauvegardée en BDD!";

export const SUCCESS_DELETE_MESSAGE =
  "Votre solution vient d'être supprimée de la BDD!";

export const SUCCESS_DELETE_ALL_MESSAGE =
  "Toutes vos solutions viennent d'être supprimée de la BDD!";
