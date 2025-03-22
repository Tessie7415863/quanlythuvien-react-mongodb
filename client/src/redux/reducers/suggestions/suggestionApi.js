import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listSuggestions: [],
};

const getAllSuggestions = createSlice({
  name: "getAllSuggestions",
  initialState,
  reducers: {
    setListSuggestions: (state, action) => {
      state.listSuggestions = action.payload;
    },
  },
});

export const { setListSuggestions } = getAllSuggestions.actions;
export default getAllSuggestions.reducer;

export const CallGetAllSuggestions = (payload) => async (dispatch) => {
  try {
    const res = await http.get(
      `/suggestions/get-all-suggestion?page=${payload.page}&limit=${payload.limit}`
    );
    dispatch(setListSuggestions(res.data.content));
  } catch (error) {
    console.log(error);
  }
};

export const CallCreateSuggestion = async (data) => {
  try {
    const res = await http.post("/suggestions/create-suggestion", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const CallDeleteSuggestion = async (id) => {
  try {
    await http.delete(`/suggestions/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const CallUpdateSuggestion = async (id, data) => {
  try {
    console.log(data);
    const res = await http.put(`/suggestions/update-suggestion/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
