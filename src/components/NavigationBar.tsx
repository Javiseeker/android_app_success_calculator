import React, { useState } from "react";

import { NavLink, withRouter } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Drawer,
  MenuList,
  MenuItem,
  ListItemText,
  Icon,
  Fab,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "30px",
      left: "30px"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: 300,
    },
    fullList: {
      width: "auto",
    },
  })
);

const NavigationBar: React.FC = (props: any) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const activeRoute = (routeName: any) => {
    return props.location.pathname === routeName ? true : false;
  };

  return (
    <div>
      <div className={classes.root}>
        <Fab color="primary" aria-label="menu" onClick={toggleDrawer(true)}>
          <Icon>menu_rounded</Icon>
        </Fab>
      </div>
      <Drawer
        classes={{ paper: classes.drawer }}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <div
          className={classes.fullList}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <MenuList>
            <NavLink
              to="/review-analysis"
              style={{ textDecoration: "none" }}
              key="review-analysis"
            >
              <MenuItem selected={activeRoute("/review-analysis")}>
                <ListItemText primary={<Typography color="primary">App Review Analyzer</Typography>} />
              </MenuItem>
            </NavLink>
            <NavLink
              to="/app-analysis"
              style={{ textDecoration: "none" }}
              key="app-analysis"
            >
              <MenuItem selected={activeRoute("/app-analysis")} style={{color: "primary"}}>
                <ListItemText primary={<Typography color="primary">App Analyzer</Typography>} />
              </MenuItem>
            </NavLink>
          </MenuList>
        </div>
      </Drawer>
    </div>
  );
};

export default withRouter(NavigationBar);
