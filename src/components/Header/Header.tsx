import React from "react";
import { Grid } from "@material-ui/core";

import uruit from "../../assets/uruitlogo.jfif";
import "./Header.css";

interface HeaderProps{
  title: string;
}
const defaultProps: HeaderProps = { title:'Default Title'}

const Header = ({title}:HeaderProps) => {
  return (
    <div className="container">
      <h1>{title}</h1>
    </div>
  );
};

Header.defaultProps = defaultProps;

export default Header;
