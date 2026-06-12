import { useState } from "react";
import { useAdminTasks, useAdminDeleteTask } from "../../hooks/useTasks";
import Loader from "../../components/common/Loader";
import ConfirmModal from "../../components/common/ConfirmModal";
import toast from "react-hot-toast";
import { FiSearch, FiTrash2 } from "react-icons/fi";

const TaskMonitoring = () => {
  const { data, isLoading, error } = useAdminTasks();
  const deleteMutation = useAdminDeleteTask();
  const [search, setSearch] = useState("");
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleConfirmDelete = () => {
    if (deleteTaskId) {
      deleteMutation.mutate(deleteTaskId, {
        onSuccess: () => {
          toast.success("Task deleted by Admin successfully!");
          setDeleteTaskId(null);
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Failed to delete task.");
          setDeleteTaskId(null);
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div style={{ color: "var(--danger)", padding: "2rem" }}>
        Error loading tasks: {error.message}
      </div>
    );
  }

  const tasks = data?.data || [];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title?.toLowerCase().includes(search.toLowerCase()) ||
      task.createdBy?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>Task Monitoring</h1>

        <p>Monitor all user tasks, view progress, and moderate records</p>
      </div>

      <div
        className="card"
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.5rem",
          padding: "1.25rem",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <FiSearch
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />

          <input
            type="text"
            placeholder="Search by task title or owner..."
            value={search}
            style={{ paddingLeft: "2.5rem" }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <p>No tasks found matching your search.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Task Title</th>

                <th>Created By</th>

                <th>Status</th>

                <th>Created At</th>

                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task._id}>
                  <td style={{ fontWeight: 600, color: "var(--text-h)" }}>{task.title}</td>

                  <td>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 500, color: "var(--text-h)" }}>
                        {task.createdBy?.name || "Unknown User"}
                      </span>

                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {task.createdBy?.email}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge ${task.status === "Completed" ? "badge-success" : "badge-warning"}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td style={{ fontSize: "0.9rem" }}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>

                  <td style={{ textAlign: "right" }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{
                        padding: "0.4rem",
                        color: "var(--danger)",
                        borderColor: "rgba(239, 68, 68, 0.2)",
                      }}
                      onClick={() => handleDeleteClick(task._id)}
                      title="Delete Task"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTaskId !== null}
        title="Confirm Task Deletion"
        message="Are you sure you want to delete this user task? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTaskId(null)}
      />
    </div>
  );
};

export default TaskMonitoring;
