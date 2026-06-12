import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

import DashboardLayout from "../components/layout/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/user/Dashboard";
import MyTasks from "../pages/user/MyTasks";
import CreateTask from "../pages/user/CreateTask";
import EditTask from "../pages/user/EditTask";

import UserManagement from "../pages/admin/UserManagement";
import TaskMonitoring from "../pages/admin/TaskMonitoring";
import ActivityLogs from "../pages/admin/ActivityLogs";
import Analytics from "../pages/admin/Analytics";

import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/tasks" element={<MyTasks />} />

          <Route path="/tasks/create" element={<CreateTask />} />

          <Route path="/tasks/edit/:id" element={<EditTask />} />
        </Route>
      </Route>

      {/* Admin Routes */}

      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/users" element={<UserManagement />} />

          <Route path="/admin/tasks" element={<TaskMonitoring />} />

          <Route path="/admin/logs" element={<ActivityLogs />} />

          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
