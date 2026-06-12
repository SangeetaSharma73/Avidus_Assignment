import { FiAlertCircle } from "react-icons/fi";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        backgroundColor: "var(--danger-bg)",
        color: "var(--danger)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        fontSize: "0.9rem",
        margin: "1rem 0",
      }}
    >
      <FiAlertCircle size={18} style={{ flexShrink: 0 }} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
