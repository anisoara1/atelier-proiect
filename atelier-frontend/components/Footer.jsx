import React from "react";
import "./Footer.css";
import logo from "../assets/logo.jpg";

const Footer = () => (
  <footer className="footer" id="contacts">
    <div className="footer-logo">
      <img src={logo} alt="Logo" />
    </div>
    <div className="footer-contact" id="contact">
      <p>Adresa: Strada Stadionului 11, Jibou 455200</p>
      <p>Telefon: 0747581863</p>
      <p>Email: atelier@gmail.com</p>
      <p>
        <a
          href="https://www.google.com/maps/place/Atelierul+de+gogosi/@47.261846,23.2602774,20.19z/data=!4m15!1m8!3m7!1s0x4748474aeb7dc455:0xd9d1138421b75406!2sStrada+Stadionului+11,+Jibou+455200!3b1!8m2!3d47.2620471!4d23.2602815!16s%2Fg%2F11q4dblxm_!3m5!1s0x474847a3b9130583:0xc0d8c465d14dee51!8m2!3d47.2620471!4d23.2602815!16s%2Fg%2F11rv9ccn8v?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find us on Google Maps
        </a>
      </p>
    </div>
    <div className="footer-social">
      <a
        href="https://facebook.com/LaplacinteGogosiCafea/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-facebook-f"></i> Facebook
      </a>
      <a
        href="https://www.instagram.com/atelierul_de_gogosi/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-instagram"></i> Instagram
      </a>
    </div>
  </footer>
);

export default Footer;
