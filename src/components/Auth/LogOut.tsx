import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Typography, Button } from "@mui/material";
import logging from "./config/logging";
import IPageProps from "./interfaces/page";
import { auth } from "./config/firebase";

const LogOutPage: React.FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();

  const Logout = () => {
    auth
      .signOut()
      .then(() => navigate("/login"))
      .catch((error: any) => logging.error(error));
  };

  return (
    <Alert
      sx={{ size: "small", marginRight: 30, marginLeft: 30, marginTop: 5 }}
      severity="info"
    >
      <Typography fontSize="16px" marginBottom={1}>
        Are you sure you want to logout?
      </Typography>
      <Button
        sx={{ margin: 2 }}
        variant="outlined"
        color="secondary"
        onClick={() => Logout()}
      >
        Logout
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => navigate("/profile")}
      >
        Cancel
      </Button>
    </Alert>
  );
};

export default LogOutPage;
