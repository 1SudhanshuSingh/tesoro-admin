import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import classes from "./Drawer.module.scss";

const Drawer: React.FC = () => (
  <div className={classes.drawerContainer}>
    <List>
      <ListItem component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem component={Link} to="/product">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Product" />
      </ListItem>
      <ListItem component={Link} to="/subproduct">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Sub Product" />
      </ListItem>
    </List>
  </div>
);

export default Drawer;
