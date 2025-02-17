import { http } from "../../../Utils/baseUrl";

export const CallCreateAuthor = async (data) => {
    try {
        const result = await http.post('/author/create-author', data);
        return result
    } catch (error) {
        return error;
    }
}