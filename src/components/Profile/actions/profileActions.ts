export const UPDATE_PROFILE_IMAGE = "UPDATE_PROFILE_IMAGE";
export const ADD_BIO = "ADD_BIO";
export const DELETE_BIO = "DELETE_BIO";

interface UpdateProfileImageAction {
  type: typeof UPDATE_PROFILE_IMAGE;
  payload: string;
}

interface AddBioAction {
  type: typeof ADD_BIO;
  payload: {
    bio: string;
  };
}

interface DeleteBioAction {
  type: typeof DELETE_BIO;
}

export type ProfileActionTypes =
  | UpdateProfileImageAction
  | AddBioAction
  | DeleteBioAction;

export const updateProfileImage = (imageUrl: string): ProfileActionTypes => ({
  type: UPDATE_PROFILE_IMAGE,
  payload: imageUrl,
});

export const addBio = (bio: string): ProfileActionTypes => ({
  type: ADD_BIO,
  payload: { bio },
});

export const deleteBio = (): ProfileActionTypes => ({
  type: DELETE_BIO,
});
