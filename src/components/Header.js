import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnLogin, setBtnLogin] = useState("Login");
  const onlineStatus = useOnlineStatus(); // ✅ call the hook

  const handleLoginBtn = () => {
    setBtnLogin((prev) => (prev === "Login" ? "Logout" : "Login"));
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={LOGO_URL} alt="Company Logo" />
      </div>

      <div className="nav-items">
        <ul>
          <li>Online Status: {onlineStatus ? "✅" : "🔴"}</li> {/* ✅ correct */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <button className="login-btn" onClick={handleLoginBtn}>
            {btnLogin}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;