import React, { ComponentType } from "react";
import { Grid } from "@mui/material";
import { Header, Drawer } from "../components";

const SideHeader = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    return (
      <>
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2}>
            <Drawer />
          </Grid>
          <Grid item xs={12} sm={8} md={10}>
            <WrappedComponent {...props} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default SideHeader;
