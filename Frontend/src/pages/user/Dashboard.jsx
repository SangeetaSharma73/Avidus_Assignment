import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../hooks/useTasks";
import StatCard from "../../components/common/StatCard";
import Loader from "../../components/common/Loader";
import { FiCheckSquare, FiClock, FiList, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, isLoading } = useTasks(1, 1000);

  if (isLoading) return <Loader />;

  const tasks = data?.data || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>Welcome, {user?.name}!</h1>

        <p>Manage your work and monitor task statuses from here.</p>
      </div>

      <div className="dashboard-grid">
        <StatCard title="Total Tasks" value={totalTasks} icon={FiList} color="var(--primary)" />

        <StatCard
          title="Completed"
          value={completedTasks}
          icon={FiCheckSquare}
          color="var(--success)"
        />

        <StatCard title="Pending" value={pendingTasks} icon={FiClock} color="var(--warning)" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {/* Productivity Card */}

        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>Completion Progress</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
              <span>Task Completion Rate</span>

              <span style={{ fontWeight: 600, color: "var(--primary)" }}>{completionRate}%</span>
            </div>

            <div
              style={{
                width: "100%",
                height: "8px",
                background: "var(--border)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${completionRate}%`,
                  height: "100%",
                  background: "var(--primary)",
                  borderRadius: "4px",
                  transition: "width 0.5s ease-out",
                }}
              />
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              {completedTasks} out of {totalTasks} tasks are completed.
            </p>
          </div>
        </div>

        {/* Quick Actions Card */}

        <div
          className="card"
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div>
            <h3 style={{ marginBottom: "1rem" }}>Quick Actions</h3>

            <p style={{ marginBottom: "1.5rem" }}>
              Need to plan a new task? Add it now to keep track of your schedule.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link to="/tasks/create" className="btn btn-primary btn-sm">
              <FiPlus size={16} />

              <span>Create Task</span>
            </Link>

            <Link to="/tasks" className="btn btn-secondary btn-sm">
              <span>View All Tasks</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
