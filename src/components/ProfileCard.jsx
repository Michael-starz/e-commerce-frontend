import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const ProfileCard = () => {
  const { user, token } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const [orderStats, setOrderStats] = useState({
    totalSpent: 0,
    totalOrders: 0,
    lastOrderDate: null,
  });

  // ✅ Fetch user info
  // ✅ Fetch user info and order stats
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get(`/users/${user.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserInfo(res.data.user);
      } catch (err) {
        const errMsg = err.response?.data?.message || "Failed to fetch user info";
        toast.error(errMsg);
      }
    };

    const fetchOrderStats = async () => {
      try {
        const res = await axiosInstance.get(`/orders/history/${user.userId}`, {
          params: {
            page: 1,
            limit: 1000,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const orders = res.data.orders || [];
    
        const totalSpent = orders.reduce(
          (acc, order) => acc + (order.totalAmount || 0),
          0
        );
    
        const lastOrder = orders[0]?.orderDate || null;
    
        setOrderStats({
          totalSpent,
          totalOrders: orders.length,
          lastOrderDate: lastOrder,
        });
      } catch (err) {
        // Only toast if it's not a 404 (maybe user has 0 orders)
        if (err.response?.status !== 404) {
          toast.error("Failed to fetch order stats");
        }
      }
    };

    if (user?.userId && token) {
      fetchUserInfo();
      fetchOrderStats();
    }
  }, [user, token]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        {/* Profile Header Section */}
        <div className="border-bottom border-secondary border-dashed pb-4">
          <div className="row align-items-center g-3 g-sm-5 text-center text-sm-start">
            {/* Profile Picture */}
            <div className="col-12 col-sm-auto">
              <input className="d-none" id="avatarFile" type="file" />
              <label className="cursor-pointer avatar avatar-5xl" htmlFor="avatarFile">
                <img 
                  className="rounded-circle img-fluid profile-picture"
                  src="/images/pexels-linkedin-2182970.jpg" 
                  alt="Profile" 
                />
              </label>
            </div>
            {/* Profile Info */}
            <div className="col-12 col-sm-auto flex-1">
              <h3>{userInfo?.name || "Loading..."}</h3>
              <p className="text-body-secondaryy">
                Joined {formatDate(userInfo.createdAt)}
              </p>
              <div>
                <a className="me-2 text-decoration-none" href="#!">
                  <i className="fab fa-linkedin-in text-body-secondaryy text-opacity-75 text-primary-hover"></i>
                </a>
                <a className="me-2 text-decoration-none" href="#!">
                  <i className="fab fa-facebook text-body-secondaryy text-opacity-75 text-primary-hover"></i>
                </a>
                <a href="#!">
                  <i className="fab fa-twitter text-body-secondaryy text-opacity-75 text-primary-hover"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="d-flex flex-between-center pt-4">
          <div>
            <h6 className="mb-2 text-body-secondaryy">Total Spent</h6>
            <h4 className="fs-8 mb-0">${orderStats.totalSpent.toFixed(2)}</h4>
          </div>
          <div className="text-end">
            <h6 className="mb-2 text-body-secondaryy">Last Order</h6>
            <h4 className="fs-8 mb-0">
              {orderStats.lastOrderDate
                ? formatDate(orderStats.lastOrderDate)
                : "N/A"}
            </h4>
          </div>
          <div className="text-end">
            <h6 className="mb-2 text-body-secondaryy">Total Orders</h6>
            <h4 className="fs-8 mb-0">{orderStats.totalOrders}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
