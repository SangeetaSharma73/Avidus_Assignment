import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "var(--bg-app)",
            minHeight: "calc(100vh - 64px)",
            transition: "var(--transition)",
            overflowY: "auto",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
