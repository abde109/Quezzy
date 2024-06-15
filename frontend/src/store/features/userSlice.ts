import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string;
    email: string;
    role?: "user" | "admin";
    profileType?: "Teacher" | "Company" | "Student" | "Candidate";
    isAuth?: boolean;
}

const initialState: UserState = {
    username: "",
    email: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initializeUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },

        killuser: (state) => {
            return { ...state, username: "" , email: "" , isAuth:false };
        }
    },

    
});

export const { initializeUser , killuser } = userSlice.actions;
export default userSlice.reducer;
