import { http } from "../../../Utils/baseUrl";

export const CallCreateBook = async (data) => {
    try {
        const result = await http.post("/book/create-book", data);
        return result
    } catch (error) {
        console.log(error);
    }
}