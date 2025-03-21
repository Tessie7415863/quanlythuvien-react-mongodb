// Tất cả những API (get) thì code theo cấu trúc sau:
import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
    listBorrows: [],
}
const getAllBorrows = createSlice({
    name: "getAllBorrows",
    initialState,
    reducers: {
        setListBorrows: (state, action) => {
            state.listBorrows = action.payload;
        },
    },
})
export const { setListBorrows } = getAllBorrows.actions;
export default getAllBorrows.reducer;

export const CallGetAllBorrows = ({ keyword, sortBy, page, limit, order, }) => {
    return async (dispatch) => {
        try {
            const result = await http.get(
                `/borrow/get-all-borrows?page=${page}&limit=${limit}&sortBy=${sortBy}&keyword=${keyword}&order=${order}`
            );
            dispatch(setListBorrows(result.data.content));
        } catch (error) {
            console.log(error);
        }
    }
};
