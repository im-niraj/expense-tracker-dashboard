import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: "",
    name: "",
    email: "",
    mobile: "",
};
export const userInfoSlice = createSlice({
    name: "userinfo",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            let { token, name, email, mobile, accId, isAdmin } = action.payload;
            state.token = token ? token : "";
            state.name = name ? name : "";
            state.email = email ? email : "";
            state.mobile = mobile ? mobile : "";
            state.accId = accId ? accId : "";
            state.isAdmin = isAdmin;
        },
        clearAuth: (state) => {
            state.token = "";
            state.name = "";
            state.email = "";
            state.mobile = "";
        },
    },
});

export const { setAuth, clearAuth } = userInfoSlice.actions;
export default userInfoSlice.reducer;
