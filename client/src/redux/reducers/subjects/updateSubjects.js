import { http } from "../../../Utils/baseUrl";

export const CallUpdateSubject = async (id, data) => {
    // Xử lý api để cập nhật môn học
    try {
        const result = await http.put(`/subject/update-subject/${id}`, data);
        return result;
    } catch (error) {
        return error;
    }
}