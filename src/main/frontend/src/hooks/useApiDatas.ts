import { useQuery } from "@tanstack/react-query";

import apiClient from "../http-common";

const fetchPuzzleCombinations = () => {
  // MOCK
  // return Promise.resolve<string>("7,8,3,1,4,5,6,2,9");

  return apiClient.post("/snake-puzzle/combinations").then((res) => {
    console.log(res);
    return res.data;
  });
};

const useApiDatas = () => {
  const getPuzzleCombinations = useQuery<string>({
    queryKey: ["post-combinations"],
    queryFn: fetchPuzzleCombinations,
    enabled: false,
  });

  return { getPuzzleCombinations };
};

export default useApiDatas;
