import { useState } from "react";
import { useUsers, useUpdateUser, useDeleteUser } from "../../hooks/useUsers";
import Loader from "../../components/common/Loader";
import ConfirmModal from "../../components/common/ConfirmModal";
import toast from "react-hot-toast";
import { FiTrash2, FiUserCheck, FiUserX } from "react-icons/fi";

const UserManagement = () => {
  const { data, isLoading, error } = useUsers();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleStatusToggle = (userId, currentStatus) => {
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    updateUserMutation.mutate(
      { userId, status: nextStatus },
      {
        onSuccess: () => {
          toast.success(`User status updated to ${nextStatus}`);
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Failed to update status.");
        },
      },
    );
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
  };

  const handleConfirmDelete = () => {
    if (deleteUserId) {
      deleteUserMutation.mutate(deleteUserId, {
        onSuccess: () => {
          toast.success("User deleted successfully!");
          setDeleteUserId(null);
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Failed to delete user.");
          setDeleteUserId(null);
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div style={{ color: "var(--danger)", padding: "2rem" }}>
        Error loading users: {error.message}
      </div>
    );
  }

  const users = data?.data || [];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.25rem" }}>User Management</h1>

        <p>Manage application users, toggle status, and delete accounts</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ fontWeight: 600, color: "var(--text-h)" }}>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`badge ${user.role === "Admin" ? "badge-primary" : "badge-secondary"}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${user.status === "Active" ? "badge-success" : "badge-danger"}`}
                  >
                    {user.status}
                  </span>
                </td>

                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                    <button
                      className={`btn btn-sm ${user.status === "Active" ? "btn-secondary" : "btn-primary"}`}
                      style={{ padding: "0.4rem 0.6rem" }}
                      onClick={() => handleStatusToggle(user._id, user.status)}
                    >
                      {user.status === "Active" ? (
                        <>
                          <FiUserX size={14} />

                          <span>Deactivate</span>
                        </>
                      ) : (
                        <>
                          <FiUserCheck size={14} />

                          <span>Activate</span>
                        </>
                      )}
                    </button>

                    {user.role !== "Admin" && (
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          padding: "0.4rem",
                          color: "var(--danger)",
                          borderColor: "rgba(239, 68, 68, 0.2)",
                        }}
                        onClick={() => handleDeleteClick(user._id)}
                        title="Delete User"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteUserId !== null}
        title="Confirm User Deletion"
        message="Are you sure you want to delete this user? This will also remove all their tasks permanently."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteUserId(null)}
      />
    </div>
  );
};

export default UserManagement;
