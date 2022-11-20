import { SnakeTableForm } from "../types/SnakeTableTypes";

const computePuzzle = (values: SnakeTableForm): number => {
  const computation =
    Number(values["number-1"]) +
    (13 * Number(values["number-2"])) / Number(values["number-3"]) +
    Number(values["number-4"]) +
    12 * Number(values["number-5"]) -
    Number(values["number-6"]) -
    11 +
    (Number(values["number-7"]) * Number(values["number-8"])) /
      Number(values["number-9"]) -
    10;
  return Math.round(computation);
};

export default computePuzzle;
