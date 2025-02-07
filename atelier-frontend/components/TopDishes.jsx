import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice"; // Asigură-te că acest import este corect
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TopDishes.css";

const TopDishes = () => {
  const baseURL = process.env.REACT_APP_SERVER_URL_DEV;
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  // Obține produsele din Redux
  const { products, loading, error } = useSelector((state) => state.products);

  // Filtrarea produselor pentru categoria "topDishes"
  const topDishes = products.filter(
    (product) => product.category === "topDishes"
  );

  // Încarcă produsele când componenta se montează
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dishes-container">
      <h1>Farfurii de top</h1>
      <div className="swiper-container">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true, dynamicBullets: false }}
          spaceBetween={15}
          slidesPerView={4}
          slidesPerGroup={4}
          breakpoints={{
            1024: { slidesPerView: 4, slidesPerGroup: 4 },
            768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 8 },
            581: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 5 },
            312: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 5 },
            0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 5 },
          }}
        >
          {topDishes.map((dish) => (
            <SwiperSlide key={dish._id}>
              <div className="dish-card">
                <img
                  src={`${baseURL}${
                    dish.image.startsWith("/") ? dish.image : `/${dish.image}`
                  }`}
                  alt={dish.title || "Imagine indisponibilă"}
                  className="daily-menu-image"
                />
                <div className="top-dishes-overlay">
                  <h3>{dish.name}</h3>
                  <p className="overlay-text">{dish.description}</p>
                  <h3>{dish.price} lei</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="swiper-button-prev"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15 19L8 12l7-7" />
          </svg>
        </div>
        <div
          className="swiper-button-next"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TopDishes;
