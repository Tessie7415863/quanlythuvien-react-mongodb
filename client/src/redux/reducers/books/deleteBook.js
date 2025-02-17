import { http } from "../../../Utils/baseUrl";

export const CallDeleteBook = async (idBook) => {
    try {
        const result = await http.delete(`/book/delete-book/${idBook}`);
        return result
    } catch (error) {
        console.log(error);
    }
}