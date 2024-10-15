import React, { useState, useEffect } from "react";
import { points } from "./data";
import "./whyus.css";
import Doctor_Patient from "../../Assets/background.png";

function WhyUs() {
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
      <div
        className="flexbox"
        style={
          isScreenLarge
            ? {
                marginTop: "100px",
                justifyContent: "center",
              }
            : {
                margin: "50px",
                justifyContent: "center",
              }
        }
      >
        <div>
          <h2
            style={{
              color: "black",
              font: "Montserrat",
              fontSize: "53px",
              fontWeight: "700",
            }}
          >
            <span style={{ color: "white" }}>Your Health is </span>{" "}
            <span style={{ color: "#FC8621" }}> our priority</span>
          </h2>
          <p style={{ color: "white" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            quibusdam explicabo quas architecto eos aliquam ducimus impedit non
            nisi quam neque, amet error magnam animi exercitationem blanditiis
            repudiandae, sed adipisci?
          </p>
        </div>
      </div>

      <div
        className="flexbox"
        style={
          isScreenLarge
            ? { justifyContent: "space-between" }
            : { margin: "50px" }
        }
      >
        <img
          src={Doctor_Patient}
          alt=""
          className={isScreenLarge ? "imageContainer" : "hide"}
        />
        <div style={{ gap: "50px" }}>
          {points.map((point) => {
            const { id, url, icon } = point;
            return (
              <>
                <div className="points" key={id}>
                  <p className="iconContainer">{icon}</p>
                  <h3>{url}</h3>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WhyUs;
