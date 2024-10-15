import React, { useState, useEffect } from "react";
import "./services.css";
import { features } from "./data";
import Doctor_Patient from "../../Assets/doctor_and_patient.png";

function Services() {
  const [isScreenLarge, setIsScreenLarge] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsScreenLarge(window.innerWidth > 1083);
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // call once initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div style={isScreenLarge ? { margin: "100px" } : { margin: "50px" }}>
        <h2
          className="center"
          style={{ font: "Montserrat", fontSize: "53px", fontWeight: "700" }}
        >
          We Analyse Your Health States In Order To{" "}
          <span style={{ color: "white" }}>Top Services</span>
        </h2>
      </div>
      <div className="flexbox" style={{ gap: "40px" }}>
        {features.map((feature) => {
          const { id, url, text, heading } = feature;
          return (
            <div className="servicesContainer" key={id}>
              <div style={{ margin: "20px" }}>
                <h3>{heading}</h3>
                <p>{text}</p>

                <button
                  style={{
                    width: "50px",
                    height: "30px",
                    marginLeft: "80%",
                  }}
                >
                  <a href={url}></a>
                </button>
              </div>
            </div>
          );
        })}
      </div>

 




    </>
  );
}

export default Services;
