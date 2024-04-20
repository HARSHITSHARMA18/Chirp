import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        console.log("Logout Successfully");
        dispatch(logout());
        navigate("/");
      })
      .catch(() => {
        console.log("LogoutBtn error while handling onChange");
      });
  };

  return (
    <button
      className="hover:text-[#B500FF]  transition-all duration-100"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
