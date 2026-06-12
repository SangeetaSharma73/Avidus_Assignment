import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} from "../api/taskApi";

import { getAllTasks, deleteAnyTask } from "../api/adminApi";

export const useTask = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],

    queryFn: () => getTaskById(taskId),

    enabled: !!taskId,
  });
};

export const useTasks = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["tasks", page, search],

    queryFn: () => getTasks(page, limit, search),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }) => updateTask(taskId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useAdminTasks = () => {
  return useQuery({
    queryKey: ["adminTasks"],
    queryFn: getAllTasks,
  });
};

export const useAdminDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnyTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminTasks"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
};

