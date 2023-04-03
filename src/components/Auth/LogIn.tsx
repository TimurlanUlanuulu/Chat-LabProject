import { Grid, TextField, Typography, Button } from "@mui/material";
import "./auth.css";
import FormControl from "@mui/material/FormControl";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Auth/config/firebase";
import IPageProps from "./interfaces/page";
import logging from "./config/logging";
import ErrorText from "./ErrorText";
import { AuthContext } from "../../context/AuthContext";
import { json } from "body-parser";

// Sign In Form
export const LogIn: React.FunctionComponent<IPageProps> = () => {
  const [login, setLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const {setCurrentUser} = useContext<any>(AuthContext);

  const navigate = useNavigate();

  const signInWithEmailAndPassword = () => {
    if (error !== "") setError("");

    setLogin(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        logging.info(result);
        localStorage.setItem("user", JSON.stringify(result.user))
        navigate("/chat");
      })
      .catch((error: any) => {
        logging.error(error);
        setLogin(false);
        setError("");
      });
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
      className="img-crypto"
        src="https://cryptologos.cc/logos/chatcoin-chat-logo.png"
        alt="chatlogo"
      />
      <Typography sx={{ marginTop: 4, fontSize: 30, fontWeight: "bold" }}>
        Log In to ChatMe
      </Typography>
      <Typography sx={{ margin: 2 }}>
        Please enter your email and password
      </Typography>
      <FormControl sx={{ marginBottom: 2 }}>
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="current-email"
          required
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </FormControl>
      <TextField
        id="email"
        label="Password"
        type="password"
        required
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <Button
        variant="contained"
        sx={{ margin: 2 }}
        onClick={() => signInWithEmailAndPassword()}
        disabled={login}
      >
        Sign In
      </Button>

      <Typography sx={{ margin: 3, fontSize: 13, fontWeight: "bold" }}>
        Don't have an account?
        <Link to="/">Register</Link>
      </Typography>
      <ErrorText error={error} />
    </Grid>
  );
};

//

export default LogIn;
