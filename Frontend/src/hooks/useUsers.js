import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getUsers, updateUserStatus, deleteUser } from "../api/adminApi";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],

    queryFn: getUsers,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }) => updateUserStatus(userId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
};
