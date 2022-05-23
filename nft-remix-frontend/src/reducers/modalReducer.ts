import {ReactNode} from "react";
import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";


export interface IModalState {
    isOpen: boolean;
    title: string;
    body: string;
    downloadLink: string;
    wrapperClasses?: string;
    headerClasses?: string;
    bodyClasses?: string;
    titleClasses?: string;
}

export const initialState: IModalState = {
    isOpen: false,
    title: "",
    body: "",
    wrapperClasses: "",
    headerClasses: "",
    bodyClasses: "",
    titleClasses: "",
    downloadLink: ""
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.downloadLink = action.payload.downloadLink;
            state.title = action.payload.title;
            state.body = action.payload.body;
            state.wrapperClasses = action.payload.wrapperClasses || "";
            state.headerClasses = action.payload.headerClasses || "";
            state.bodyClasses = action.payload.bodyClasses || "";
            state.titleClasses = action.payload.titleClasses || "";
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.title = "";
            state.body = "";
            state.wrapperClasses = "";
            state.headerClasses = "";
            state.bodyClasses = "";
            state.titleClasses = "";
            state.downloadLink = "";
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;

export const useModal = () => useSelector((state: RootState) => state.modal.isOpen);

export const useModalContent = () => useSelector((state: RootState) => ({
    title: state.modal.title,
    content: state.modal.body,
    wrapperClasses: state.modal.wrapperClasses,
    headerClasses: state.modal.headerClasses,
    bodyClasses: state.modal.bodyClasses,
    titleClasses: state.modal.titleClasses,
    downloadLink: state.modal.downloadLink
}))


export default modalSlice.reducer;