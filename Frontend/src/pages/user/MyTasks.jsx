import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks, useDeleteTask } from "../../hooks/useTasks";
import { FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import toast from "react-hot-toast";

const MyTasks = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const { data, isLoading, error } = useTasks(page, 10, search);
  const deleteTaskMutation = useDeleteTask();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleConfirmDelete = async () => {
    if (deleteTaskId) {
      deleteTaskMutation.mutate(deleteTaskId, {
        onSuccess: () => {
          toast.success("Task deleted successfully!");
          setDeleteTaskId(null);
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Failed to delete task.");
        },
      });
    }
  };

  if (error) {
    return (
      <div style={{ color: "var(--danger)", padding: "2rem" }}>
        Error loading tasks: {error.message}
      </div>
    );
  }

  const tasks = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const filteredTasks =
    statusFilter === "All" ? tasks : tasks.filter((t) => t.status === statusFilter);

  return (
    <div className="fade-in">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "0.25rem" }}>My Tasks</h1>

          <p>Create, update, and organize your work checklist</p>
        </div>

        <Link to="/tasks/create" className="btn btn-primary">
          <FiPlus size={18} />

          <span>New Task</span>
        </Link>
      </div>

      {/* Filters & Search Bar */}

      <div
        className="card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.5rem",
          padding: "1.25rem",
        }}
      >
        <div style={{ flex: 1, minWidth: "250px", position: "relative" }}>
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
            placeholder="Search tasks by title..."
            value={search}
            style={{ paddingLeft: "2.5rem" }}
            onChange={handleSearchChange}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["All", "Pending", "Completed"].map((filter) => (
            <button
              key={filter}
              className={`btn btn-sm ${statusFilter === filter ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setStatusFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : filteredTasks.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            No tasks found matching your criteria.
          </p>

          <Link to="/tasks/create" className="btn btn-primary btn-sm">
            Create your first task
          </Link>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Task Title</th>

                  <th>Description</th>

                  <th>Status</th>

                  <th>Created At</th>

                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task._id}>
                    <td style={{ fontWeight: 600, color: "var(--text-h)" }}>{task.title}</td>

                    <td
                      style={{
                        color: "var(--text-muted)",
                        maxWidth: "300px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {task.description || "(No description)"}
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
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <Link
                          to={`/tasks/edit/${task._id}`}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.4rem" }}
                          title="Edit Task"
                        >
                          <FiEdit2 size={14} />
                        </Link>

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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Page {page} of {totalPages}
              </span>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  className="btn btn-secondary btn-sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                >
                  Previous
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmModal
        isOpen={deleteTaskId !== null}
        title="Confirm Deletion"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTaskId(null)}
      />
    </div>
  );
};

export default MyTasks;
