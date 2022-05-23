import { ISiteInfo } from "../interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {useSelector} from "react-redux";

const initialState: ISiteInfo = {
    siteEmail: "nft.remix@test.com",
    siteAuthors: [{
        name: "Viziteu David",
        email: "david.viziteu@test.com",
        photoUrl: "https://static.wikia.nocookie.net/animalcrossing/images/b/bf/NH-Jacques_poster.png/revision/latest?cb=20200522062617"
    }, {
        name: "Bacauanu Gabriel",
        email: "gabriel.bacauanu@test.com",
        photoUrl: "https://static.wikia.nocookie.net/animalcrossing/images/9/9a/NH-Ankha_poster.png/revision/latest?cb=20200410182618"
    }, {
        name: "Zet Teodor",
        email: "teodor.zet@test.com",
        photoUrl: "https://static.wikia.nocookie.net/animalcrossing/images/f/f7/NH-Eugene_poster.png/revision/latest?cb=20200410192826"
    }]
}

export const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setSiteData: (state, action) => {
            state.siteEmail = action.payload.siteEmail;
            state.siteAuthors = action.payload.siteAuthors;
        }
    }
})

export const { setSiteData } = infoSlice.actions;

export const useSiteInfo = () => useSelector((state: RootState) => state.info);

export const useAuthors = () => useSelector((state: RootState) => state.info.siteAuthors);

export default infoSlice.reducer;