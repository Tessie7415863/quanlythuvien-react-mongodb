import { http } from "../../../Utils/baseUrl";

export const CallUpdateAuthor = async (data) => {
    // Xử lý API để cập nhật tác giả
    try {
        const result = await http.put('/author/update-author', data);
        return result.data;
    } catch (error) {
        return error;
    }
    //async await là để xử lý bất đồng bộ -> xếp hàng đợi kết quả trả về
}