import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import MenuSection from "../components/MenuSection";
import OrderFilters from "../components/OrderFilters";
import OrderPagination from "../components/OrderPagination";
import axiosInstance from "../api/axiosInstance";

const OrderHistory = () => {
  const { user, token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchOrders = async (page = 1, filter = "All") => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/orders/history/${user.userId}`, {
      params: { 
        page, 
        limit 
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });

      const data = res.data;
      if (data && data.orders) {
    const filteredOrders =
      filter === "All"
        ? data.orders
        : data.orders.filter((order) => order.status === filter);

    setOrders(filteredOrders);
    setTotalPages(data.totalPages || 1);
    setCurrentPage(data.currentPage || 1);
  } else {
    // If the data is empty but the request was "successful"
    setOrders([]);
  }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to load order history";
      toast.error(errorMessage);
      console.error("Order Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchOrders(currentPage, statusFilter);
    }
  }, [user, token, currentPage, statusFilter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-400";
      case "Shipped":
        return "text-blue-400";
      case "Fulfilled":
        return "text-green-400";
      case "Ready to Pickup":
        return "text-cyan-400";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-white";
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <MenuSection />

      <div className="min-h-screen bg-darkbg text-white py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-white">
            Order History
          </h2>

          {/* Filter Bar */}
          <OrderFilters
            activeStatus={statusFilter}
            onFilterChange={handleFilterChange}
          />

          {/* Orders Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <p className="text-white text-center">Loading order history...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-400 text-center">
                You have no past orders yet.
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.orderId}
                  className="card card-body border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-blue-500/20 transition"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-blue-300">
                      Order #{order.orderId.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Date: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p
                      className={`text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      Status: {order.status}
                    </p>

                    {/* ✅ NEW: Delivery Method */}
                    {order.deliveryMethod && (
                      <p className="text-sm text-yellow-400">
                        Delivery: {order.deliveryMethod}
                      </p>
                    )}

                    {/* ✅ NEW: Discount */}
                    {order.discountAmount > 0 && (
                      <p className="text-sm text-pink-400">
                        Discount: -${order.discountAmount.toFixed(2)}
                      </p>
                    )}

                    {/* ✅ NEW: Tax & Shipping */}
                    {order.tax !== undefined && (
                      <p className="text-sm text-gray-400">
                        Tax: ${order.tax.toFixed(2)}
                      </p>
                    )}
                    {order.shipping !== undefined && (
                      <p className="text-sm text-gray-400">
                        Shipping: ${order.shipping.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div className="text-sm text-gray-300 mb-2">
                    Items:{" "}
                    <span className="text-white font-medium">
                      {order.totalItems}
                    </span>
                  </div>

                  <div className="text-sm text-gray-300">
                    Total:{" "}
                    <span className="text-white font-semibold">
                      ${order.totalAmount?.toFixed(2)}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-gray-400">
                    {order.products?.map((item) => (
                      <li key={item.productId} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <OrderPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderHistory;
