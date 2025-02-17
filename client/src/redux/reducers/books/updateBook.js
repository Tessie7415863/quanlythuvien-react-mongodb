import { http } from "../../../Utils/baseUrl";

export const CallUpdateBook = async (idBook, data) => {
    try {
        const result = await http.put(`/book/update-book/${idBook}`, data);
        return result
    } catch (error) {
        console.log(error);
    }
}