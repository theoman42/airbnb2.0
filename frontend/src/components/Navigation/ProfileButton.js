import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faBars } from "@fortawesome/free-solid-svg-icons";
import LoginFormModal from "../LoginFormModal";

function ProfileButton({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
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
        <button onClick={logout}>Log Out</button>
      </>
    );
  } else {
    sessionLinks = (
      <div className="profile-dropdown">
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <FontAwesomeIcon className="bars-icon" icon={faBars} />
        <FontAwesomeIcon className="user-icon" icon={faFaceSmile} />
      </button>
      <div className="dropdown-wrapper">{showMenu && sessionLinks}</div>
    </>
  );
}

export default ProfileButton;

// (
//   <ul className="profile-dropdown">
//     <li>{user.firstName}</li>
//     <li>{user.email}</li>
//     <li>
//       <button onClick={logout}>Log Out</button>
//     </li>
//   </ul>
// )
