import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const BillingSection = ({ sameAsShipping, setSameAsShipping }) => {
  const { user } = useAuth();

  // ✅ Controlled form fields
  const [billingName, setBillingName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingPostcode, setBillingPostcode] = useState("");

  // ✅ Auto-fill when "same as shipping" is unchecked
  useEffect(() => {
    if (!sameAsShipping && user) {
      setBillingName(user.name || "");
      setBillingAddress(user.address || "");
      setBillingPhone(user.phone || "");
      setBillingPostcode(user.postCode || "");
    }
  }, [sameAsShipping, user]);

  return (
    <>
      <h3>Billing Details</h3>
      <div className="form-check">
        <input 
          className="form-check-input" 
          id="sameAsShipping" 
          type="checkbox" 
          checked={sameAsShipping}
          onChange={() => setSameAsShipping(!sameAsShipping)}
        />
        <label className="form-check-label" htmlFor="sameAsShipping">
          Same as shipping address
        </label>
      </div>

      {!sameAsShipping && (
        <table className="table-borderless mt-4 checkout-table">
          <tbody>
            {/* Name */}
            <tr>
              <td className="py-2 ps-0">
                <div className="d-flex">
                  <i className="fas fa-user checkout-info-icon"></i>
                  <h5 className="checkout-info-label">Name</h5>
                </div>
              </td>
              <td className="py-2 checkout-info-separator">:</td>
              <td className="py-2 px-5">
                <input 
                  type="text"
                  value={billingName}
                  onChange={(e) => setBillingName(e.target.value)}
                  className="form-control bg-transparent border-0 p-0 checkout-info-value"
                />
              </td>
            </tr>

            {/* Address */}
            <tr>
              <td className="py-2 ps-0">
                <div className="d-flex">
                  <i className="fas fa-home checkout-info-icon"></i>
                  <h5 className="checkout-info-label">Address</h5>
                </div>
              </td>
              <td className="py-2 checkout-info-separator">:</td>
              <td className="py-2 px-5">
                <textarea 
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="form-control bg-transparent border-0 p-0 checkout-info-value"
                  rows="2"
                />
              </td>
            </tr>

            {/* Phone */}
            <tr>
              <td className="py-2 ps-0">
                <div className="d-flex">
                  <i className="fas fa-phone checkout-info-icon"></i>
                  <h5 className="checkout-info-label">Phone</h5>
                </div>
              </td>
              <td className="py-2 checkout-info-separator">:</td>
              <td className="py-2 px-5">
                <input 
                  type="text"
                  value={billingPhone}
                  onChange={(e) => setBillingPhone(e.target.value)}
                  className="form-control bg-transparent border-0 p-0 checkout-info-value"
                />
              </td>
            </tr>

            {/* ✅ NEW: Postcode */}
            <tr>
              <td className="py-2 ps-0">
                <div className="d-flex">
                  <i className="fas fa-map-pin checkout-info-icon"></i>
                  <h5 className="checkout-info-label">Postcode</h5>
                </div>
              </td>
              <td className="py-2 checkout-info-separator">:</td>
              <td className="py-2 px-5">
                <input 
                  type="text"
                  value={billingPostcode}
                  onChange={(e) => setBillingPostcode(e.target.value)}
                  className="form-control bg-transparent border-0 p-0 checkout-info-value"
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default BillingSection;
