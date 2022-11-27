import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  jest.mock("@tanstack/react-query", () => ({
    useQuery: () => ({ isLoading: false, error: {}, data: [] }),
  }));
});

test("renders learn react link", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 0,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  render(
    <>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </>
  );
  const headerElement = screen.getByText(/Vietnamese Snake Puzzle/i);
  expect(headerElement).toBeInTheDocument();
  const footerElement = screen.getByText(
    / Copyright © 2022-2023 Nicolas Couroussé | All Rights Reserved/i
  );
  expect(footerElement).toBeInTheDocument();
});
