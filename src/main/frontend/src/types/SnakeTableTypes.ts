import { SNAKE_TABLE_PREFIX_KEY } from "../constants/SnakeTableConstant";

export type SnakeTableValues =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type SnakeTableKeys =
  | `${typeof SNAKE_TABLE_PREFIX_KEY}1`
  | `${typeof SNAKE_TABLE_PREFIX_KEY}2`
  | `${typeof SNAKE_TABLE_PREFIX_KEY}3`
  | `${typeof SNAKE_TABLE_PREFIX_KEY}4`
  | `${typeof SNAKE_TABLE_PREFIX_KEY}5`
  | `${typeof SNAKE_TABLE_PREFIX_KEY}6`
  | `${typeof SNAKE_TABLE_PREFIX_KEY}7`
  | `${typeof SNAKE_TABLE_PREFIX_KEY}8`
  | `${typeof SNAKE_TABLE_PREFIX_KEY}9`;

export type SnakeTableForm = {
  [key in SnakeTableKeys]: SnakeTableValues;
};

export interface Combination {
  id: number;
  combination: string;
}
