import api from "./axios";

/*
ANALYTICS
*/
export const getAnalytics = async () => {
  const response = await api.get("/admin/analytics");

  return response.data;
};

/*
USERS
*/
export const getUsers = async () => {
  const response = await api.get("/admin/users");

  return response.data;
};

export const updateUserStatus = async (userId, status) => {
  const response = await api.patch(`/admin/users/${userId}/status`, {
    status,
  });

  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);

  return response.data;
};

/*
TASKS
*/
export const getAllTasks = async () => {
  const response = await api.get("/admin/tasks");

  return response.data;
};

export const deleteAnyTask = async (taskId) => {
  const response = await api.delete(`/admin/tasks/${taskId}`);

  return response.data;
};

/*
ACTIVITY LOGS
*/
export const getActivityLogs = async () => {
  const response = await api.get("/admin/logs");

  return response.data;
};
