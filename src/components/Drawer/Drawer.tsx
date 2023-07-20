import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ProductIcon from "@mui/icons-material/ShoppingBasket";
import SubProductIcon from "@mui/icons-material/Storage";
import ItemIcon from "@mui/icons-material/LocalMall";
import classes from "./Drawer.module.scss";

const Drawer: React.FC = () => {
  return (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/category">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>

        <ListItem component={Link} to="/product">
          <ListItemIcon>
            <ProductIcon />
          </ListItemIcon>
          <ListItemText primary="Product" />
        </ListItem>
        <ListItem component={Link} to="/subproduct">
          <ListItemIcon>
            <SubProductIcon />
          </ListItemIcon>
          <ListItemText primary="Sub Product" />
        </ListItem>
        <ListItem component={Link} to="/item">
          <ListItemIcon>
            <ItemIcon />
          </ListItemIcon>
          <ListItemText primary="Item" />
        </ListItem>
      </List>
    </div>
  );
};

export default Drawer;
