import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateTask } from "../../hooks/useTasks";
import toast from "react-hot-toast";
import ErrorMessage from "../../components/common/ErrorMessage";

const CreateTask = () => {
  const navigate = useNavigate();
  const mutation = useCreateTask();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }
    setError("");

    mutation.mutate(form, {
      onSuccess: () => {
        toast.success("Task created successfully!");
        navigate("/tasks");
      },
      onError: (err) => {
        setError(err.response?.data?.message || "Failed to create task.");
        toast.error(err.response?.data?.message || "Task Creation Failed");
      },
    });
  };

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>Create Task</h1>

        <p>Add details for your upcoming task workflow</p>
      </div>

      <div className="card">
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title</label>

            <input
              type="text"
              placeholder="e.g. Design Landing Page"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>

            <textarea
              placeholder="Provide a detailed description of the task requirements..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
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

            <button type="submit" className="btn btn-primary" disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
