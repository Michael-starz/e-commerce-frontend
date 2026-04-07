import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "../api/axiosInstance";

const AddressCard = () => {
  const { user, token } = useAuth();
  const [addressInfo, setAddressInfo] = useState({
    address: "",
    postCode: "",
    email: "",
    phone: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newPostCode, setNewPostCode] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // ✅ Fetch user info
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axiosInstance.get(`/users/${user.userId}`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
        const data = res.data;
        if (!res.ok) throw new Error(data.message || "Could not fetch address");

        if (data?.user) {
      setAddressInfo({
        address: data.user.address || "",
        postCode: data.user.postCode || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
      });

      setNewAddress(data.user.address || "");
      setNewPostCode(data.user.postCode || "");
      setNewPhone(data.user.phone || "");
    }
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Failed to load address info";
        toast.error(errorMsg);
        console.error("Fetch Address Error:", err);
      }
    };

    if (user?.userId && token) fetchAddress();
  }, [user, token]);

  // ✅ Validate phone format
  const isValidPhone = (phone) => {
    const regex = /^\+?\d{7,15}$/;
    return !phone || regex.test(phone); // valid or empty
  };

  // ✅ Handle update
  const handleUpdate = async () => {
  if (!isValidPhone(newPhone)) {
    toast.error("Please enter a valid phone number.");
    return;
  }

  // Create the object with updated fields
  const payload = {};
  if (newAddress) payload.address = newAddress;
  if (newPostCode) payload.postCode = newPostCode;
  if (newPhone) payload.phone = newPhone;

  try {
    const res = await axiosInstance.put(
      `/users/${user.userId}/update-details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;

    setAddressInfo((prev) => ({
      ...prev,
      ...payload, 
    }));

    setShowModal(false);
    toast.success(data.message || "Details updated successfully!");
    
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Error updating details";
    toast.error(errorMessage);
    console.error("Update Details Error:", err);
  }
};

  return (
    <>
      <div className="card h-100">
        <div className="card-body">
          <div className="border-bottom border-secondary border-dashed">
            <h4 className="mb-3">
              Default Address
              <button
                className="btn btn-link p-0"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <i className="fas fa-pen-to-square fs-9 ms-3 text-body-quaternary"></i>
              </button>
            </h4>
          </div>

          {/* Address Details */}
          <div className="pt-4 mb-7 mb-lg-4 mb-xl-7">
            <div className="row justify-content-between">
              <div className="col-auto">
                <h5 className="text-body-highlight">Address</h5>
              </div>
              <div className="col-auto">
                <p className="text-body-secondaryy">
                  {addressInfo.address || "No address set"}<br />
                  {addressInfo.postCode || "No postcode"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-top border-secondary top-border-dashed pt-4">
            <div className="row flex-between-center mb-2">
              <div className="col-auto">
                <h5 className="mb-0">Email</h5>
              </div>
              <div className="col-auto">
                {addressInfo.email ? (
                  <a className="lh-1 text-decoration-none" href={`mailto:${addressInfo.email}`}>
                    {addressInfo.email}
                  </a>
                ) : (
                  <span className="text-body-secondaryy">Not provided</span>
                )}
              </div>
            </div>
            <div className="row flex-between-center">
              <div className="col-auto">
                <h5 className="mb-0">Phone</h5>
              </div>
              <div className="col-auto">
                {addressInfo.phone ? (
                  <a className="text-decoration-none" href={`tel:${addressInfo.phone}`}>
                    {addressInfo.phone}
                  </a>
                ) : (
                  <span className="text-body-secondaryy">Not provided</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Postcode</label>
            <input
              type="text"
              className="form-control"
              value={newPostCode}
              onChange={(e) => setNewPostCode(e.target.value)}
              placeholder="Enter postcode"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="+1234567890"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressCard;
