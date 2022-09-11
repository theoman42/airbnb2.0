import React, { useState, useEffect, Link } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import githubImage from "../../images/github-logo.png";
import linkedin from "../../images/linkedin-112.png";

function ProfileButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState("isHidden");

  const openMenu = () => {
    if (showMenu === "isShown") return;
    setShowMenu("isShown");
  };

  useEffect(() => {
    if (showMenu === "isHidden") return;

    const closeMenu = () => {
      setShowMenu("isHidden");
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div>{`${sessionUser.firstName} ${sessionUser.lastName}`}</div>
        <div>{`${sessionUser.email}`}</div>
        <button className="dropdown-buttons" onClick={logout}>
          Log Out
        </button>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  let aboutLinks = (
    <div className="logo-container-about">
      <a href="https://github.com/theoman42/airbnb2.0">
        <img src={githubImage} alt="github logo" />
      </a>
      <a href="https://www.linkedin.com/in/theofandrich/">
        <img src={linkedin} alt="github logo" />
      </a>
    </div>
  );

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <FontAwesomeIcon className="bars-icon" icon={faBars} />
        <FontAwesomeIcon className="user-icon" icon={faFaceSmile} />
      </button>
      <div className="dropdown-wrapper">
        <div className={`profile-dropdown ${showMenu}`}>
          {sessionLinks}
          {aboutLinks}
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
