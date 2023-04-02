import {
  ProfileActionTypes,
  ADD_BIO,
  DELETE_BIO,
  UPDATE_PROFILE_IMAGE,
} from "../actions/profileActions";

export interface ProfileState {
  imageUrl: string;
  bio: string;
}

const initialState: ProfileState = {
  imageUrl: "https://example.com/profile-image.jpg",
  bio: "",
};

export default function profileReducer(
  state = initialState,
  action: ProfileActionTypes
): ProfileState {
  switch (action.type) {
    case UPDATE_PROFILE_IMAGE:
      return { ...state, imageUrl: action.payload };
    case ADD_BIO:
      return { ...state, bio: action.payload.bio };
    case DELETE_BIO:
      return { ...state, bio: "" };
    default:
      return state;
  }
}
