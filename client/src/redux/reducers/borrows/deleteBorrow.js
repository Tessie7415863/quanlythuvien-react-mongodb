import { http } from "../../../Utils/baseUrl";

export const CallDeleteBorrow = async (id) => {
    try {
        const result = await http.delete(`/borrow/delete-borrow?id=${id}`,);
        return result
    } catch (error) {
        console.log(error);
    }
}