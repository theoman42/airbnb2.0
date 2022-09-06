import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../images/logo.png";
import DemoLogin from "./DemoLogin";
import AddSpotModal from "../AddSpotModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const goHome = () => {
    history.push(`/`);
  };

  return (
    <div className="nav-container">
      <div className="logo-container" onClick={goHome}>
        <img className="logo" src={logo} alt="dis is a logo" />
      </div>
      <div className="right-side-navbar-div">
        <DemoLogin />
        <AddSpotModal />
        <ProfileButton user={sessionUser} />
      </div>
    </div>
  );
}

export default Navigation;
