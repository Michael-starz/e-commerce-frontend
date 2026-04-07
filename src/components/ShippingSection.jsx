import { useAuth } from "../context/AuthContext"; // ✅ NEW

const ShippingSection = () => {
  const { user } = useAuth(); // ✅ Access user data

  // ✅ Graceful fallback values
  const fullName = user?.name || "Not provided";
  const address = user?.address || "No address saved";
  const phone = user?.phone || "No phone number";
  const postCode = user?.postCode || "No postcode saved";

  return (
    <>
      <div className="d-flex align-items-end">
        <h3 className="checkout-heading">Shipping Details</h3>
        <button className="btn btn-link checkout-edit-btn" type="button">Edit</button>
      </div>

      <table className="table-borderless mt-4 checkout-table">
        <tbody>
          <tr>
            <td className="py-2 ps-0">
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" className="checkout-info-icon">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <h5 className="checkout-info-label">Name</h5>
              </div>
            </td>
            <td className="py-2 checkout-info-separator">:</td>
            <td className="py-2 px-3">
              <h5 className="checkout-info-value">{fullName}</h5>
            </td>
          </tr>

          <tr>
            <td className="py-2 ps-0">
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" className="checkout-info-icon">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <h5 className="checkout-info-label">Address</h5>
              </div>
            </td>
            <td className="py-2 checkout-info-separator">:</td>
            <td className="py-2 px-3">
              <h5 className="checkout-info-value">{address}, {postCode}</h5>
            </td>
          </tr>

          <tr>
            <td className="py-2 ps-0">
              <div className="d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" className="checkout-info-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2
                    19.79 19.79 0 0 1-8.63-3.07
                    19.5 19.5 0 0 1-6-6
                    19.79 19.79 0 0 1-3.07-8.67
                    A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72
                    12.84 12.84 0 0 0 .7 2.81
                    2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6
                    l1.27-1.27a2 2 0 0 1 2.11-.45
                    12.84 12.84 0 0 0 2.81.7
                    A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <h5 className="checkout-info-label">Phone</h5>
              </div>
            </td>
            <td className="py-2 checkout-info-separator">:</td>
            <td className="py-2 px-3">
              <h5 className="checkout-info-value">{phone}</h5>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShippingSection;
