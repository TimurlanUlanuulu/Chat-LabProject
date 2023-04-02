import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import { Phone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId]: any = React.useState(null);

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);
  };
  console.log(setVerificationCode);

  const handleSendCode = () => {
    if (!phoneRegex.test(phoneNumber)) {
      alert("Invalid phone number");
      return;
    }

    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(setVerificationId)
      .catch(alert);
  };

  const handleVerifyCode = () => {
    if (!verificationId) {
      alert("Verification ID not found");
      return;
    }

    firebase
      .auth()
      .signInWithCredential(
        firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        )
      );
  };

  if (!verificationId) {
    return (
      <div>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="https://cryptologos.cc/logos/chatcoin-chat-logo.png"
            alt="chatlogo"
          />
          <Typography sx={{ marginTop: 4, fontSize: 30, fontWeight: "bold" }}>
            Log In to ChatMe
          </Typography>
          <Typography sx={{ margin: 2 }}>
            Please enter your phone number
          </Typography>
          <FormControl sx={{ marginBottom: 2 }}>
            <TextField
              id="phone"
              label="Phone Number"
              type="tel"
              required
              onChange={handlePhoneNumberChange}
              value={phoneNumber}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Phone />}
            onClick={handleSendCode}
          >
            Send Verification Code
          </Button>

          <Typography sx={{ margin: 3, fontSize: 13, fontWeight: "bold" }}>
            Don't have an account?
            <Link to="/register">Register</Link>
          </Typography>
          <div
            id="recaptcha-container"
            data-sitekey="6LcsaxsdAAAAAEBn0sPDCEncnU9564MisyRuDzD_"
            data-callback="sendForm"
            data-size="invisible"
          ></div>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="https://cryptologos.cc/logos/chatcoin-chat-logo.png"
          alt="chatlogo"
        />
        <Typography sx={{ marginTop: 4, fontSize: 30, fontWeight: "bold" }}>
          Verify Your Code
        </Typography>
        <Typography sx={{ margin: 2 }}>
          Please write the code we sent you
        </Typography>
        <FormControl sx={{ marginBottom: 2 }}>
          <TextField
            label="Verification Code"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleVerifyCode}>
          Verify Code
        </Button>
      </Grid>
    </div>
  );
}

export default PhoneAuth;
