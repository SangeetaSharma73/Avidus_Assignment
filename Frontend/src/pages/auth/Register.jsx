import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiActivity, FiShield } from "react-icons/fi";
import ErrorMessage from "../../components/common/ErrorMessage";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      toast.success("Registration Successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
      toast.error(err.response?.data?.message || "Registration Failed");
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

        <h2 className="auth-title">Create Account</h2>

        <p className="auth-subtitle">Register to begin managing your task workflow</p>

        <ErrorMessage message={error} />

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="form-group">
            <label className="form-label">Full Name</label>

            <div style={{ position: "relative" }}>
              <FiUser
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
                placeholder="John Doe"
                value={form.name}
                style={{ paddingLeft: "2.5rem" }}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>

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
                placeholder="john@example.com"
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
                placeholder="•••••••• (min 6 characters)"
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

          <div className="form-group">
            <label className="form-label">Select Account Role</label>

            <div style={{ position: "relative" }}>
              <FiShield
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />

              <select
                value={form.role}
                style={{ paddingLeft: "2.5rem" }}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                  })
                }
              >
                <option value="User">Regular User</option>

                <option value="Admin">Administrator</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "0.5rem" }}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
