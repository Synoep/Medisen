import React, { useState, useEffect } from "react";
import "./info.css";
import doctor from "../../Assets/doctors.png";

function Info() {
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
        style={isScreenLarge ? { position: "relative" } : { margin: "50px" }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <h2
              style={{
                color: "black",
                font: "Montserrat",
                fontSize: "53px",
                fontWeight: "700",
              }}
            >
              Bringing The Future Of{" "}
              <span style={{ color: "#FC8621" }}>HealthCare</span>
            </h2>
            <br />
            <br />
            <p style={{ fontSize: "18", color: "#757575" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
              debitis aliquam distinctio qui minus odit magni, necessitatibus
              fuga nulla nihil voluptatum enim dolores consectetur velit fugiat
              cum. Laborum mollitia quidem hic commodi laboriosam fugiat cumque
              ad ab molestias? Sed, voluptates!
            </p>
            <br />
            <br />
            <button className="btn">Use button</button>
          </div>

          <img
            src={doctor}
            alt=""
            className={isScreenLarge ? "imgContainer" : "hide"}
          />
        </div>
      </div>
    </>
  );
}

export default Info;
