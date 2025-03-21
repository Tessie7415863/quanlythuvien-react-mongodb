import { http } from "../../../Utils/baseUrl";

export const getBookById = async (id) => {
  const response = await http.get(`book/get-book-by-id/${id}`);
  return response.data.content;
};
