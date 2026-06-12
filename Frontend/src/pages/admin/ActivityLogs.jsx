import { useEffect, useState } from "react";

import api from "../../api/axios";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const { data } = await api.get("/admin/logs");

    setLogs(data.data);
  };

  return (
    <div>
      <h1>Activity Logs</h1>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.user?.name}</td>

              <td>{log.action}</td>

              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogs;
