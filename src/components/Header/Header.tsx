import React from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";

interface HeaderProps {
  title: string;
}
const defaultProps: HeaderProps = { title: "Default Title" };

const Header = ({ title }: HeaderProps) => {
  return (
    <Typography variant="h4" align="center" color="primary" gutterBottom>
      {title}
    </Typography>
  );
};

Header.defaultProps = defaultProps;

export default Header;
