import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
    listSubjects: [],
};

const getAllSubjects = createSlice({
    name: "getAllSubjects",
    initialState,
    reducers: {
        setListSubjects: (state, action) => {
            state.listSubjects = action.payload;
        },
    },
});

export const { setListSubjects } = getAllSubjects.actions;
export default getAllSubjects.reducer;

export const CallGetAllSubjects = () => {
    return async (dispatch) => {
        try {
            const result = await http.get("/subject/get-all-subjects");
            dispatch(setListSubjects(result.data.content));
            return result.data.content;
        } catch (error) {
            console.log(error);
        }
    };
};
