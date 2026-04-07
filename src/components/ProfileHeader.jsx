import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "../api/axiosInstance";

const ProfileHeader = () => {
  const { user, token } = useAuth();

  // ✅ New states for password reset modal
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Submit handler
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.patch(
        `/users/change-password/${user.userId}`,
        { 
          currentPassword, 
          newPassword 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || "Failed to update password");

      toast.success(res.data.message || "Password updated successfully!");
      setShowModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error updating password.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak", color: "bg-danger" };
    if (score === 2) return { label: "Medium", color: "bg-warning" };
    return { label: "Strong", color: "bg-success" };
  };

  return (
    <>
      <div className="row align-items-center justify-content-between g-3 mb-4">
        <div className="col-lg-8 col-sm-12">
          <h2 className="mb-0">Profile</h2>
        </div>
        <div className="col-lg-4 col-sm-12">
          <div className="row g-2 g-sm-3">
            <div className="col-auto">
              <button className="btn btn-danger bg-transparent text-danger border-secondary cust-del">
                <i className="fas fa-trash-can me-2"></i>
                Delete customer
              </button>
            </div>
            <div className="col-auto">
              {/* ✅ Trigger password reset modal */}
              <button
                className="btn btn-secondary text-secondary bg-transparent border-secondary password-reset"
                onClick={() => setShowModal(true)}
              >
                <i className="fas fa-key me-2"></i>
                Reset password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Password Reset Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          {newPassword && (
            <div className="mt-2">
              <div className="progress" style={{ height: "6px" }}>
                <div
                  className={`progress-bar ${
                    getPasswordStrength(newPassword).color
                  }`}
                  role="progressbar"
                  style={{
                    width:
                      getPasswordStrength(newPassword).label === "Weak"
                        ? "33%"
                        : getPasswordStrength(newPassword).label === "Medium"
                        ? "66%"
                        : "100%",
                  }}
                ></div>
              </div>
              <small className="text-muted">
                Strength: {getPasswordStrength(newPassword).label}
              </small>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handlePasswordChange}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileHeader;
