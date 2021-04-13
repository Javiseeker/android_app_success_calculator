import React from "react";
import { Typography } from "@material-ui/core";

interface HeaderProps {
  title: string;
}
const defaultProps: HeaderProps = { title: "Default Title" };

const Header: React.FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <Typography variant="h4" align="center" color="primary" gutterBottom>
      {title}
    </Typography>
  );
};

Header.defaultProps = defaultProps;

export default Header;
