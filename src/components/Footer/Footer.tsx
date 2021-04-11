import React from "react";
import Image from "../Utility/Image/Image";
import uruitLogo from "../../assets/uruitlogo.jfif";
import mandalorianLogo from "../../assets/mandalorianlogo.png";
import githublogo from "../../assets/githublogo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-placeholder">
      <div className="footer-row">
        <div className="footer-column-1">
          <a>About</a>
        </div>
        <div className="footer-column-2">
          <div className="image-holder">
            <Image
              imgSrc={uruitLogo}
              altPath=""
              onClickUrl="https://www.uruit.com"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                pointerEvents: "stroke",
                cursor: "pointer",
                borderRadius: "50%",
              }}
              onClickEnabled={true}
            />
          </div>
          <div className="image-holder">
            <Image
              imgSrc={githublogo}
              altPath=""
              onClickUrl="https://github.com/Javiseeker/android_app_success_calculator"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                pointerEvents: "stroke",
                cursor: "pointer",
                borderRadius: "50%",
              }}
              onClickEnabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
