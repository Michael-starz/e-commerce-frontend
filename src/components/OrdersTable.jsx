import { useEffect, useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const OrdersTable = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ View Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ✅ Sorting
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/history/${user.userId}?page=${page}&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch orders");

        const formatted = data.orders.map((order) => ({
          id: `#${order.orderId.slice(-6)}`,
          status: order.status,
          statusClass: getStatusClass(order.status),
          icon: getStatusIcon(order.status),
          delivery: order.deliveryMethod,
          date: new Date(order.orderDate), // store as Date object
          total: order.totalAmount,
        }));

        // ✅ Apply sorting
        formatted.sort((a, b) => {
          return sortOrder === "asc"
            ? a.date - b.date
            : b.date - a.date;
        });

        setOrders(formatted);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId && token) {
      fetchUserOrders();
    }
  }, [user, token, page, sortOrder]); // ✅ sortOrder in deps

  // ✅ Helpers
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
      case "Unfulfilled":
        return "status-warning";
      case "Shipped":
      case "Fulfilled":
        return "status-success";
      case "Ready to pickup":
        return "status-info";
      case "Cancelled":
        return "status-secondary";
      default:
        return "status-secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return "fa-clock";
      case "Shipped":
      case "Fulfilled":
        return "fa-check";
      case "Ready to pickup":
        return "fa-info-circle";
      case "Cancelled":
        return "fa-times";
      default:
        return "fa-question-circle";
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="order-table-wrapper">
      <div className="d-flex justify-between items-center mb-3">
        <h5 className="text-white mb-0">Order Summary</h5>

        {/* ✅ Sort Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="secondary" size="sm">
            Sort by Date
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSortOrder("desc")}>
              Newest First
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOrder("asc")}>
              Oldest First
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <table className="order-table">
        <thead className="order-table-head">
          <tr>
            <th style={{ width: "15%" }}>ORDER</th>
            <th style={{ width: "15%" }}>STATUS</th>
            <th style={{ width: "20%" }}>DELIVERY METHOD</th>
            <th className="text-right" style={{ width: "15%" }}>DATE</th>
            <th className="text-right" style={{ width: "15%" }}>TOTAL</th>
            <th className="text-right" style={{ width: "15%" }}></th>
          </tr>
        </thead>

        <tbody className="order-table-body">
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center text-white py-4">Loading...</td>
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">No orders found.</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={index} onClick={() => handleViewOrder(order)}>
                <td className="order-table-cell">
                  <a className="order-link" href="#!" onClick={() => handleViewOrder(order)}>{order.id}</a>
                </td>
                <td className="order-table-cell">
                  <span className={`status-tag ${order.statusClass}`}>
                    <span>{order.status}</span>
                    <i className={`fas ${order.icon} icon-margin text-smaller`}></i>
                  </span>
                </td>
                <td className="order-table-cell">{order.delivery}</td>
                <td className="order-table-cell text-right">
                  {order.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="order-table-cell text-right">${order.total?.toFixed(2)}</td>
                <td className="order-table-cell text-right">
                  <div style={{ position: "relative" }}>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        className="btn btn-sm border-0 dropdown-toggle dropdown-caret-none"
                      >
                        <i className="fas fa-ellipsis-h text-secondary"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu-end py-2"
                        style={{
                          position: "absolute",
                          zIndex: 9999,
                          top: "100%",
                          right: 0,
                        }}
                      >
                        {/* <Dropdown.Item onClick={() => handleViewOrder(order)}>View</Dropdown.Item>
                        <Dropdown.Item>Export</Dropdown.Item>
                        <Dropdown.Divider /> */}
                        {/* <Dropdown.Item className="text-danger">Remove</Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div className="text-center mt-4">
        <Button
          variant="outline-light"
          className="mx-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Previous
        </Button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline-light"
          className="mx-2"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </Button>
      </div>

      {/* ✅ View Order Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="card text-white">
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="card text-white">
          {selectedOrder ? (
            <div className="text-sm">
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Total:</strong> ${selectedOrder.total?.toFixed(2)}</p>
              <p><strong>Date:</strong> {selectedOrder.date.toDateString()}</p>
              <p><strong>Delivery:</strong> {selectedOrder.delivery}</p>
            </div>
          ) : (
            <p>No order selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer className="card text-white">
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrdersTable;
