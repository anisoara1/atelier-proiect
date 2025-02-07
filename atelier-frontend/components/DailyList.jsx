import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import "./DailyList.css";

const DailyList = () => {
  const baseURL = process.env.REACT_APP_SERVER_URL_DEV;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const dailyMenus = products.filter(
    (product) => product.category === "dailyMenu"
  );

  const handleBack = () => {
    navigate("/atelier");
  };

  const handleAddToCart = (menu) => {
    dispatch(addToCart(menu)); // Adăugăm meniul în coș
  };

  return (
    <div className="daily-menu-list">
      <button className="back-arrow" onClick={handleBack}>
        &larr;
      </button>

      <h1>Meniul zilei</h1>
      <div className="menu-list">
        {dailyMenus.map((menu) => (
          <div key={menu._id} className="daily-menu-card">
            <div className="daily-img-card">
              <img
                src={`${baseURL}${
                  menu.image.startsWith("/") ? menu.image : `/${menu.image}`
                }`}
                alt={menu.title || "Imagine indisponibilă"}
                className="daily-menu-image"
              />
            </div>
            <div className="daily-text-container">
              <h3>{menu.name}</h3>
              <h5>{menu.description}</h5>
              <hr className="daily-orange-line" />
              <div className="menu-footer">
                <button
                  className="daily-order-button"
                  onClick={() => handleAddToCart(menu)} // Adăugăm în coș
                >
                  Adaugă
                </button>
                <p className="daily-price">{menu.price} lei</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyList;
