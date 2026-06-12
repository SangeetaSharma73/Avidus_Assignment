import { useEffect, useState } from "react";
import api from "../../api/axios";

const Analytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get("/admin/analytics");

      setStats(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Analytics</h1>

      <div>
        <h3>
          Total Users:
          {stats.totalUsers}
        </h3>

        <h3>
          Total Tasks:
          {stats.totalTasks}
        </h3>

        <h3>
          Completed:
          {stats.completedTasks}
        </h3>

        <h3>
          Pending:
          {stats.pendingTasks}
        </h3>
      </div>
    </div>
  );
};

export default Analytics;
