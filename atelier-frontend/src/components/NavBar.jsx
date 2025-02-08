import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import config from "../config";
import logo from "../assets/logo.jpg";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the OrderPage when the button is clicked
  };

  const isAdminPage =
    location.pathname === "/login" || location.pathname === "/admin";

  return (
    <header className="header">
      <div className="container">
        <div className="site-name">
          <div className="nav-logo">
            <img src={logo} alt="Logo" />
          </div>
          <h1 className="title">{config.siteName}</h1>
        </div>
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/">Acasa</Link>
            </li>
            <li>
              <Link to="#about">Despre</Link>
            </li>
            <li>
              <Link to="#menu">Meniu</Link>
            </li>
            <li>
              <Link to="#contact" smooth="true" duration={500}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <button className="book-table-button" onClick={handleCartClick}>
          <span className="cart-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </span>
          <span className="cart-text">Cosul tau</span>
        </button>

        {isAdminPage && (
          <ul className="admin-link">
            {location.pathname === "/login" ? (
              <li>
                <Link to="/atelier">Home</Link>
              </li>
            ) : (
              !isAuthenticated && (
                <li>
                  <Link to="/login">Admin</Link>
                </li>
              )
            )}
            {isAuthenticated && location.pathname !== "/login" && (
              <li>
                <Link
                  to={location.pathname === "/admin" ? "/atelier" : "/admin"}
                >
                  {location.pathname === "/admin" ? "Home" : "Admin"}
                </Link>
              </li>
            )}
          </ul>
        )}
        <button className="burger-menu" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <button className="overlay-close" onClick={toggleMenu}>
              <span className="overlay-close-btn">X</span>
            </button>
            <ul className="overlay-list">
              <li>
                <a href="#home" onClick={toggleMenu}>
                  Acasa
                </a>
              </li>
              <li>
                <a href="#about" onClick={toggleMenu}>
                  Despre
                </a>
              </li>
              <li>
                <a href="#menu" onClick={toggleMenu}>
                  Meniu
                </a>
              </li>
              <li>
                <a href="#contact" onClick={toggleMenu}>
                  Contact
                </a>
              </li>
              {isAdminPage && (
                <>
                  {location.pathname === "/login" ? (
                    <li>
                      <Link to="/atelier" onClick={toggleMenu}>
                        Home
                      </Link>
                    </li>
                  ) : (
                    !isAuthenticated && (
                      <li>
                        <Link to="/login" onClick={toggleMenu}>
                          Admin
                        </Link>
                      </li>
                    )
                  )}
                  {isAuthenticated && location.pathname !== "/login" && (
                    <li>
                      <Link
                        to={
                          location.pathname === "/admin" ? "/atelier" : "/admin"
                        }
                        onClick={toggleMenu}
                      >
                        {location.pathname === "/admin" ? "Home" : "Admin"}
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
