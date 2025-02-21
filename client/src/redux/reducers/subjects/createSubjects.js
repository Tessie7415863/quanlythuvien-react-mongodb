import { http } from "../../../Utils/baseUrl";

export const CallCreateSubject = async (data) => {
    try {
        const result = await http.post('/subject/create-subject', data)
        return result
    } catch (error) {
        return error;
    }
}