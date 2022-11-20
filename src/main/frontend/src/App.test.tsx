import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const headerElement = screen.getByText(/Vietnamese Snake Puzzle/i);
  expect(headerElement).toBeInTheDocument();
  const footerElement = screen.getByText(
    / Copyright © 2022-2023 Nicolas Couroussé | All Rights Reserved/i
  );
  expect(footerElement).toBeInTheDocument();
});
