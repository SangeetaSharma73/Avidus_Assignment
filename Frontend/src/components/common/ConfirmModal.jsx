import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <h3>{title}</h3>

        <p>{message}</p>

        <div className="modalActions">
          <button className="btn btn-secondary btn-sm" onClick={onCancel}>
            Cancel
          </button>

          <button className="btn btn-danger btn-sm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
