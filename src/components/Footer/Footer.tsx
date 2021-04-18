import Image from "../Utility/Image/Image";
import uruitLogo from "../../assets/uruitlogo.jfif";
import githublogo from "../../assets/githublogo.png";
import ailablogo from '../../assets/ailablogo.svg';
import {Link} from 'react-router-dom';
import AiLabConnectionChecker from '../AiLabConnectionChecker';
import "./Footer.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const linkStyle = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: "primary",
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }),
);

const Footer: React.FC = () => {
  const linkClass = linkStyle();

  return (
    <div className="footer-placeholder">
      <div className="footer-row">
        <div className="footer-column-1">
          <Link to="/" className={linkClass.link}>About</Link>
        </div>
        <div className="footer-column-2">
          <AiLabConnectionChecker />
        </div>
        <div className="footer-column-3">
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

          <div className="image-holder">
            <Image
              imgSrc={ailablogo}
              altPath=""
              onClickUrl="http://app-ml.carrasco.uruit.com"
              style={{
                marginTop: "1px",
                maxWidth: "40px",
                maxHeight: "40px",
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
