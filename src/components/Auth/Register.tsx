import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { auth } from "./config/firebase";
import logging from "./config/logging";
import IPageProps from "./interfaces/page";
import ErrorText from "./ErrorText";

const Register: FC<IPageProps> = () => {
  const [registering, setRegistering] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm) {
      setError("Please make sure your password match.");
      return;
    }
    if (error !== "") setError("");

    setRegistering(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        navigate("/login");
      })
      .catch((error) => {
        logging.error(error);

        if (error.code.includes("auth/weak-password")) {
          setError("Пожалуйста, введите более надежный пароль.");
        } else if (error.code.includes("auth/email-already-in-use")) {
          setError("Этот электронный адрес уже занят.");
        } else {
          setError("Не удается войти,попробуйте еще раз");
        }
        setRegistering(false);
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
        Register to ChatMe
      </Typography>
      <Typography sx={{ margin: 2 }}>
        Please enter your fullname, email and password
      </Typography>
      <FormControl sx={{ marginBottom: 2 }}>
        <TextField
          id="fullName"
          label="Fullname"
          type="text"
          autoComplete="fullName"
          required
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
      </FormControl>

      <FormControl sx={{ marginBottom: 2 }}>
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="current-email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl sx={{ marginBottom: 2 }}>
        <TextField
          id="email"
          label="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </FormControl>
      <TextField
        id="email"
        label="Confirm password"
        type="password"
        required
        onChange={(e) => setConfirm(e.target.value)}
        value={confirm}
      />
      <Button
        variant="contained"
        sx={{ margin: 2 }}
        onClick={() => signUpWithEmailAndPassword()}
        disabled={registering}
      >
        Register
      </Button>

      <Typography sx={{ margin: 3, fontSize: 13, fontWeight: "bold" }}>
        Already have an account? <Link to="/login">Log In</Link>{" "}
      </Typography>
      <ErrorText error={error} />
    </Grid>
  );
};

export default Register;