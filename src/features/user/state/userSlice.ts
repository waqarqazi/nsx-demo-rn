/**
 * User slice for Redux
 * Manages user profile state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserState {
  profile: UserProfile | null;
}

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    clearProfile: state => {
      state.profile = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
});

export const { setProfile, clearProfile, updateProfile } = userSlice.actions;
export default userSlice.reducer;
