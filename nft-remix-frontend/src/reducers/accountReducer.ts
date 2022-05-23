import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {useSelector} from "react-redux";


export interface IAccountState {
    isAuth: boolean;
    id: string;
}

const initialState: IAccountState = {
    isAuth: false,
    id: ""
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            state.isAuth = true;
            state.id = action.payload.id;
        },
        logout: (state) => {
            state = initialState;
        }
    }
})

export const useAuth = () => useSelector((state: RootState) => state.account.isAuth);

export const useId = () => useSelector((state: RootState) => state.account.id);

export const { login, logout } = accountSlice.actions;
export default accountSlice.reducer;