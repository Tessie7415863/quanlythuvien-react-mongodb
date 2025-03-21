import { http } from "../../../Utils/baseUrl";

export const CallGetBorrowByUserId = async (userId) => {
  const response = await http.get(`/borrow/get-borrows-by-user-id/${userId}`);
  return response.data.content;
};
