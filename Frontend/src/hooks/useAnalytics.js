import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "../api/adminApi";

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],

    queryFn: getAnalytics,
  });
};
