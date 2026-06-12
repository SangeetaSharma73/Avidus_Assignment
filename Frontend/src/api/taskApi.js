import api from "./axios";

/*
GET TASKS
*/
export const getTasks = async (page = 1, limit = 10, search = "") => {
  const response = await api.get(
    `/tasks?page=${page}&limit=${limit}&search=${search}`,
  );

  return response.data;
};

/*
GET SINGLE TASK
*/
export const getTaskById = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);

  return response.data;
};

/*
CREATE TASK
*/
export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);

  return response.data;
};

/*
UPDATE TASK
*/
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);

  return response.data;
};

/*
DELETE TASK
*/
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);

  return response.data;
};
