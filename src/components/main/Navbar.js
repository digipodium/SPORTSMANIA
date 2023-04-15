import React from "react";
import app_config from "../../config";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";

const Navbar = () => {
  const { title, themeColor } = app_config;

  const {loggedIn, setLoggedIn, logout} = useUserContext();
  console.log(loggedIn);

  const showLoggedIn = () => {
    if (!loggedIn) {
      return (
        <>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/main/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/main/register">
            Register
          </NavLink>
        </li>
        </>
      );
    }
  }

  const showLogout = () => {
    if (loggedIn) {
      return (
        <li className="nav-item">
          <button className="btn btn-danger ms-3" aria-current="page" onClick={logout}>
            Logout
          </button>
        </li>
      );
    }}

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: themeColor }}
    >
      <div className="container">
        <NavLink className="navbar-brand" to="/main/home">
          <div className="d-flex align-items-center">
            <img src="/logo.png" height={50} />
            <h3 className="ms-2">{title}</h3>
          </div>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/main/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/user/createtournament">
                Create New Tournament
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/user/managetournament">
                Manage Existing Tournament
              </NavLink>
            </li>
            {showLoggedIn()}
            {showLogout()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
