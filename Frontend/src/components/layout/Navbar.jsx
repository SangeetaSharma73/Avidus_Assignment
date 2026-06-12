import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiLogOut, FiUser, FiActivity } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        height: "64px",
        background: "var(--bg-navbar)",
        color: "var(--text-main)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <Link
        to="/dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--primary)",
          fontSize: "1.25rem",
          fontWeight: 700,
        }}
      >
        <FiActivity size={24} />
        <span style={{ color: "var(--text-h)" }}>TaskVibe</span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "var(--primary)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
          </div>
          <span style={{ fontWeight: 500, fontSize: "0.95rem", color: "var(--text-h)" }}>
            {user?.name}
          </span>
          <span
            className="badge badge-primary"
            style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem" }}
          >
            {user?.role}
          </span>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-main)",
            padding: "0.4rem 0.8rem",
          }}
          onClick={handleLogout}
        >
          <FiLogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
