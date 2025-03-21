// Tất cả những API (get) thì code theo cấu trúc sau:
import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../Utils/baseUrl";

const initialState = {
  listBooks: [],
}
const getAllBooks = createSlice({
  name: "getAllBooks",
  initialState,
  reducers: {
    setListBooks: (state, action) => {
      state.listBooks = action.payload;
    },
  },
})
export const { setListBooks } = getAllBooks.actions;
export default getAllBooks.reducer;
export const CallGetALlBooks = (params = {}) => {
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

      const result = await http.get(`/book/get-all-books?${queryParams}`);

      dispatch(setListBooks(result.data.content));
    } catch (error) {
      console.log(error);
    }
  };
};

