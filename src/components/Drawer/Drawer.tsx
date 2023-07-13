import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import classes from "./Drawer.module.scss";

const Drawer: React.FC = () => {
  return (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/category">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Category" />
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
        <ListItem component={Link} to="/item">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Item" />
        </ListItem>
      </List>
    </div>
  );
};

export default Drawer;
