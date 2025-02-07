import Hero from "../../components/Hero";
import TopDishes from "../../components/TopDishes";
import AboutUs from "../../components/AboutUs";
import Menu from "../../components/Menu";
import DailyMenu from "../../components/DailyMenu";
import Footer from "../../components/Footer";
import React from "react";
import css from "../HomePage/HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={css.home}>
      <Hero />
      <TopDishes />
      <AboutUs />
      <Menu />
      <DailyMenu />
      <Footer />
    </div>
  );
};
