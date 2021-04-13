import Image from "../Utility/Image/Image";
import uruitLogo from "../../assets/uruitlogo.jfif";
import githublogo from "../../assets/githublogo.png";
import {Link} from 'react-router-dom';
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footer-placeholder">
      <div className="footer-row">
        <div className="footer-column-1">
          <Link to="/" style={{color: "black"}}>About</Link>
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
