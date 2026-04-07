import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";


const UserForm = ({ showForm, setShowForm }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ NEW: Use auth context
  const { login: authLogin } = useAuth();

  // Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (!isLogin && name.trim().length < 3) {
      toast.error("Full name must be at least 3 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const payload = isLogin
    ? { email, password }
    : { name, email, password };

  const path = isLogin ? "/users/login" : "/users/register";

  try {
    const res = await axiosInstance.post(path, payload);

    const serverResponse = res.data; 

    toast.success(serverResponse.message || "Success!");

    if (serverResponse.user && serverResponse.token) {
      authLogin(serverResponse.user, serverResponse.token);
      navigate("/");
      setShowForm(false);
    } else {
      console.error("Backend sent success but missing user/token:", serverResponse);
      toast.error("Login successful, but profile data missing.");
    }

  } catch (err) {
    const errorMessage = err.response?.data?.message || "Something went wrong";
    console.log("Full Error Object:", err);
    toast.error(errorMessage);
  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   const payload = isLogin
  //     ? { email, password }
  //     : { name, email, password };

  //   const path = isLogin ? "/users/login" : "/users/register";

  //   try {
  //     const res = await axiosInstance.post(path, payload);

  //     const data = res.data;

  //     if (!res.ok) throw new Error(data.message || "Something went wrong");

  //     toast.success(data.message || "Success!");

  //     // ✅ NEW: Save to auth context
  //     authLogin(data.user, data.token); // stores user and token globally
  //     navigate("/")

  //     setShowForm(false);
  //   } catch (err) {
  //     const errorMessage = err.response?.data?.message || "Something went wrong";
  //     toast.error(errorMessage);
  //   }
  // };

  return (
    <div className={`user-form ${showForm ? "show" : ""}`}>
      <div className="close-form" onClick={() => setShowForm(false)}>
        <i className="fas fa-times"></i>
      </div>

      <div className={`container ${!isLogin ? "active" : ""}`}>
        <div className="user">
          {/* Image Box */}
          <div className="img-box">
            <img
              src={
                isLogin
                  ? "/images/tablet-login-concept-illustration_114360-7863.avif"
                  : "/images/4536828.jpg"
              }
              alt={isLogin ? "Login" : "Signup"}
            />
          </div>

          {/* Form Box */}
          <div className={`form-box ${isLogin ? "login-form" : ""}`}>
            <div className="top">
              <p>
                {isLogin ? "Not a member?" : "Already a member?"}
                <span className="toggle-btn" onClick={toggleForm}>
                  {isLogin ? " Sign up" : " Login"}
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <h2>{isLogin ? "Hello Again!" : "Create Account"}</h2>
                <p>
                  {isLogin
                    ? "Welcome back, please login to your account."
                    : "Get started with your free account"}
                </p>

                {!isLogin && (
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <div className="icon">
                      <img src="https://cdn-icons-png.flaticon.com/512/456/456283.png" alt="" />
                    </div>
                  </div>
                )}

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/6134/6134724.png" alt="" />
                  </div>
                </div>

                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    className="icon toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/709/709612.png" alt="" />
                  </div>
                </div>

                {isLogin && (
                  <span className="forgot-password">Forgot Password?</span>
                )}

                <input
                  type="submit"
                  value={isLogin ? "Login" : "Create Account"}
                />
              </div>

              <div className="form-control">
                <p>Or {isLogin ? "login" : "sign up"} with</p>
                <div className="icons">
                  <div className="icon"><i className="fab fa-google"></i></div>
                  <div className="icon"><i className="fab fa-facebook-f"></i></div>
                  <div className="icon"><i className="fab fa-twitter"></i></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;



