import { http } from "../../../Utils/baseUrl";

export const CallDeleteAuthor = async (id) => {
    // Xử lý API để xóa tác giả
    try {
        const result = await http.delete(`/author/delete-author/${id}`);
        return result
    } catch (error) {
        return error;
    }
    //async await là để xử lý bất đồng bộ -> xếp hàng đợi kết quả trả về
}