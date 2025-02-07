import React from "react";
import config from "../config";
import "./AboutUs.css";
import atelier from "../assets/atelier.jpg";

const AboutUs = () => (
  <section className="about-us" id="about">
    <div className="about-us-container">
      {/* Left Image */}
      <div className="image-container">
        <img
          src={atelier} // Replace with the actual image path
          alt="About Us"
          className="about-us-image"
        />
      </div>

      {/* Right Text Description */}
      <div className="about-us-text-container">
        <h2>{config.aboutUsTitle}</h2>
        <p>
          La {config.siteName}, ne mândrim cu oferirea celor mai delicioase
          gogoși din oraș. Folosim doar ingrediente de cea mai bună calitate și
          rețete tradiționale pentru a aduce un zâmbet pe fața fiecărui client.
        </p>
        <p>
          Echipa noastră dedicată lucrează din greu pentru a asigura că fiecare
          gogoșă este perfectă, iar serviciul nostru este de neegalat. Vino să
          ne vizitezi și să te bucuri de o experiență culinară de neuitat!
        </p>
      </div>
    </div>
  </section>
);

export default AboutUs;
