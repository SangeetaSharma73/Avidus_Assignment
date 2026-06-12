import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiGrid,
  FiCheckSquare,
  FiPlusCircle,
  FiUsers,
  FiEye,
  FiList,
  FiBarChart2,
} from "react-icons/fi";

const Sidebar = () => {
  const { user } = useAuth();

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    color: isActive ? "#ffffff" : "var(--text-main)",
    backgroundColor: isActive ? "var(--primary)" : "transparent",
    fontWeight: isActive ? 600 : 500,
    fontSize: "0.95rem",
    textDecoration: "none",
    transition: "var(--transition)",
    marginBottom: "0.25rem",
  });

  return (
    <aside
      style={{
        width: "260px",
        background: "var(--bg-card)",
        borderRight: "1px solid var(--border)",
        minHeight: "calc(100vh - 64px)",
        padding: "1.5rem 1rem",
        transition: "var(--transition)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <h4
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted)",
              marginBottom: "0.75rem",
              paddingLeft: "0.5rem",
            }}
          >
            User Menu
          </h4>

          <nav style={{ display: "flex", flexDirection: "column" }}>
            <NavLink to="/dashboard" style={linkStyle}>
              <FiGrid size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/tasks" style={linkStyle} end>
              <FiCheckSquare size={18} />
              <span>My Tasks</span>
            </NavLink>

            <NavLink to="/tasks/create" style={linkStyle}>
              <FiPlusCircle size={18} />
              <span>Create Task</span>
            </NavLink>
          </nav>
        </div>

        {user?.role === "Admin" && (
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--text-muted)",
                marginBottom: "0.75rem",
                paddingLeft: "0.5rem",
              }}
            >
              Admin Menu
            </h4>

            <nav style={{ display: "flex", flexDirection: "column" }}>
              <NavLink to="/admin/analytics" style={linkStyle}>
                <FiBarChart2 size={18} />
                <span>Analytics</span>
              </NavLink>

              <NavLink to="/admin/users" style={linkStyle}>
                <FiUsers size={18} />
                <span>User Management</span>
              </NavLink>

              <NavLink to="/admin/tasks" style={linkStyle}>
                <FiEye size={18} />
                <span>Task Monitoring</span>
              </NavLink>

              <NavLink to="/admin/logs" style={linkStyle}>
                <FiList size={18} />
                <span>Activity Logs</span>
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
