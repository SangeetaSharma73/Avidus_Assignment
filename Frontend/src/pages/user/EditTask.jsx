import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTask, useUpdateTask } from "../../hooks/useTasks";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import toast from "react-hot-toast";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error: fetchError } = useTask(id);
  const updateMutation = useUpdateTask();
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);

  const task = data?.data;
  const currentForm = form ?? {
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Pending",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentForm.title.trim()) {
      setError("Task title is required.");
      return;
    }
    setError("");

    updateMutation.mutate(
      {
        taskId: id,
        data: currentForm,
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully!");
          navigate("/tasks");
        },
        onError: (err) => {
          setError(err.response?.data?.message || "Failed to update task.");
          toast.error(err.response?.data?.message || "Task Update Failed");
        },
      },
    );
  };

  if (isLoading) return <Loader />;

  if (fetchError) {
    return (
      <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
        <ErrorMessage
          message={`Error fetching task data: ${fetchError.response?.data?.message || fetchError.message}`}
        />

        <Link to="/tasks" className="btn btn-secondary">
          Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>Edit Task</h1>

        <p>Modify task status and core details</p>
      </div>

      <div className="card">
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title</label>

            <input
              type="text"
              value={currentForm.title}
              onChange={(e) =>
                setForm({
                  ...currentForm,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>

            <textarea
              value={currentForm.description}
              onChange={(e) =>
                setForm({
                  ...currentForm,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Task Status</label>

            <select
              value={currentForm.status}
              onChange={(e) =>
                setForm({
                  ...currentForm,
                  status: e.target.value,
                })
              }
            >
              <option value="Pending">Pending</option>

              <option value="Completed">Completed</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1.5rem",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/tasks" className="btn btn-secondary">
              Cancel
            </Link>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
