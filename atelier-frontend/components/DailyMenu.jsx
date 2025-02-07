import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./DailyMenu.css";

const DailyMenu = () => (
  <div className="daily-menu-container">
    <Link to="/dailylist">
      <button className="view-menu-button">Meniul zilei</button>
    </Link>
  </div>
);

export default DailyMenu;
