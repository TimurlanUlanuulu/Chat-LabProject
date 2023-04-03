import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  updateProfileImage,
  addBio,
  deleteBio,
} from "./actions/profileActions";
import { Button, Grid, TextField, Typography, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircularProgress from "@mui/material/CircularProgress";

const Profile = () => {
  const dispatch = useDispatch();
  const imageUrl = useSelector((state: RootState) => state.profile.imageUrl);
  const bio = useSelector((state: RootState) => state.profile.bio);
  const [bioValue, setBioValue] = useState("");

  const navigate = useNavigate();

  const handleBioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setBioValue(event.target.value);
    },
    []
  );

  const handleAddBioClick = useCallback(() => {
    dispatch(addBio(bioValue));
    setBioValue("");
  }, [dispatch, bioValue]);

  const handleDeleteBioClick = useCallback(() => {
    dispatch(deleteBio());
  }, [dispatch]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          dispatch(updateProfileImage(reader.result as string));
        });
        reader.readAsDataURL(file);
      }
    },
    [dispatch]
  );

  return (
    <div>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "lightGrey",
          width: 700,
          height: 610,
          marginLeft: 43,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: 30, fontWeight: "bold", marginBottom: 3 }}
        >
          MY PROFILE
        </Typography>

        <Avatar
          src={imageUrl}
          sx={{ width: 130, height: 130, marginBottom: 2 }}
        />
        <Typography>Username:</Typography>
        <Typography>Roseanne Park</Typography>

        <Typography>Gmail:</Typography>
        <Typography>amkmskmkw@12mskms.com</Typography>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
          />
          <PhotoCamera />
        </IconButton>

        <TextField
          label="Bio"
          variant="outlined"
          value={bioValue}
          onChange={handleBioChange}
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddBioClick} size="small">
          Add Bio
        </Button>
        <Button
          variant="contained"
          onClick={handleDeleteBioClick}
          startIcon={<DeleteIcon />}
          size="small"
        >
          Delete Bio
        </Button>
        <Typography>{bio}</Typography>

        <Button
          onClick={() => navigate("/logout")}
          variant="outlined"
          color="error"
          sx={{ marginTop: 10 }}
        >
          Log Out
        </Button>
      </Grid>
    </div>
  );
};

export default Profile;
