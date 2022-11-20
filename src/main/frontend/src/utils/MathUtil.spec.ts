import { SnakeTableForm } from "../types/SnakeTableTypes";
import computePuzzle from "./MathUtil";

describe("Test de la fonction MathUtil", () => {
  it("Test de la fonction computePuzzle : should be success", () => {
    const values = {
      "number-1": "7",
      "number-2": "8",
      "number-3": "3",
      "number-4": "1",
      "number-5": "4",
      "number-6": "5",
      "number-7": "6",
      "number-8": "2",
      "number-9": "9",
    } as SnakeTableForm;
    const result = computePuzzle(values);
    expect(result).toBe(66);
  });

  it("Test de la fonction computePuzzle : should be failure", () => {
    const values = {
      "number-1": "8",
      "number-2": "8",
      "number-3": "3",
      "number-4": "1",
      "number-5": "4",
      "number-6": "5",
      "number-7": "6",
      "number-8": "2",
    } as SnakeTableForm;

    const result = computePuzzle(values);
    expect(result).not.toBe(66);
  });
});
