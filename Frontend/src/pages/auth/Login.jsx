import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiActivity } from "react-icons/fi";
import ErrorMessage from "../../components/common/ErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", form);
      login(data.user, data.token);
      toast.success("Login Successful!");
      if (data.user.role === "Admin") {
        navigate("/admin/analytics");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--primary-glow)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiActivity size={24} />
          </div>
        </div>

        <h2 className="auth-title">Welcome Back</h2>

        <p className="auth-subtitle">Sign in to manage your tasks effectively</p>

        <ErrorMessage message={error} />

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="form-group">
            <label className="form-label">Email Address</label>

            <div style={{ position: "relative" }}>
              <FiMail
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                style={{ paddingLeft: "2.5rem" }}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>

            <div style={{ position: "relative" }}>
              <FiLock
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />

              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                style={{ paddingLeft: "2.5rem" }}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "0.5rem" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
