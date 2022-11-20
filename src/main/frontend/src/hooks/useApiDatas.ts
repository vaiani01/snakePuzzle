import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import apiClient from "../http-common";

const fetchPuzzleCombinations = () => {
  return Promise.resolve<string>("Hello world");
};

const useApiDatas = () => {
  const getPuzzleCombinations = useQuery<string>({
    queryKey: ["todos"],
    queryFn: fetchPuzzleCombinations,
  });

  return { getPuzzleCombinations };
};

export default useApiDatas;
