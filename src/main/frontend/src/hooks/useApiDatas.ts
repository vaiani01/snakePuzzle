import { useMutation, useQuery } from "@tanstack/react-query";

import apiClient from "../http-common";
import { Combination } from "../types/SnakeTableTypes";

const fetchPuzzleCombinations = (
  displayedCombination?: string
): Promise<Combination> => {
  const url = displayedCombination
    ? `/snake-puzzle/combinations/${displayedCombination}`
    : "/snake-puzzle/combinations";

  return apiClient.post(url).then((res) => {
    console.log(res);
    return res.data;
  });
};

const deletePuzzleCombinationsById = (
  displayedId?: number
): Promise<boolean> => {
  return apiClient
    .delete(`/snake-puzzle/combinations/${displayedId}`)
    .then((resp) => resp.status === 200);
};

const deletePuzzleCombinations = (): Promise<boolean> => {
  return apiClient
    .delete("/snake-puzzle/combinations")
    .then((resp) => resp.status === 200);
};

const putPuzzleCombinations = (
  displayedCombination?: string
): Promise<boolean> => {
  return apiClient
    .put(`/snake-puzzle/combinations/${displayedCombination}`)
    .then((resp) => resp.status === 200);
};

const useApiDatas = (displayedCombination?: Combination) => {
  const postPuzzleCombination = useMutation<Combination>({
    mutationFn: () =>
      fetchPuzzleCombinations(displayedCombination?.combination),
  });

  const deletePuzzleCombination = useQuery<boolean>({
    queryKey: ["delete-combination"],
    queryFn: () => deletePuzzleCombinationsById(displayedCombination?.id),
    enabled: false,
  });
  const deleteAllPuzzleCombinations = useQuery<boolean>({
    queryKey: ["delete-all-combinations"],
    queryFn: () => deletePuzzleCombinations(),
    enabled: false,
  });
  const updatePuzzleCombinations = useMutation(putPuzzleCombinations);

  return {
    postPuzzleCombination,
    deletePuzzleCombination,
    deleteAllPuzzleCombinations,
    updatePuzzleCombinations,
  };
};

export default useApiDatas;
