import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <Link to="/dashboard">Go Home</Link>
    </div>
  );
};

export default NotFound;
