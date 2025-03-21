// Tất cả những API (get) thì code theo cấu trúc sau:
import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
    listUsers: [],
}
const getAllUsers = createSlice({
    name: "getAllUsers",
    initialState,
    reducers: {
        setListUsers: (state, action) => {
            state.listUsers = action.payload;
        },
    },
})
export const { setListUsers } = getAllUsers.actions;
export default getAllUsers.reducer;
export const CallGetAllUsers = (params = {}) => {
    return async (dispatch) => {
        try {
            const { keyword, sortBy, page, limit, order } = params; // Không có giá trị mặc định

            const queryParams = new URLSearchParams({
                ...(keyword && { keyword }),
                ...(sortBy && { sortBy }),
                ...(page && { page }),
                ...(limit && { limit }),
                ...(order && { order }),
            }).toString(); // Loại bỏ tham số có giá trị falsy như undefined hoặc null

            const result = await http.get(`/users/get-all-users?${queryParams}`);

            dispatch(setListUsers(result.data.content));
        } catch (error) {
            console.log(error);
        }
    };
};
