const StatCard = ({ title, value }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minWidth: "220px",
      }}
    >
      <h4
        style={{
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      <h2>{value}</h2>
    </div>
  );
};

export default StatCard;
