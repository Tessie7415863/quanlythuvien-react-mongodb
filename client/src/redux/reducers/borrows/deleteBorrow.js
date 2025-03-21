import { http } from "../../../Utils/baseUrl";

export const CallDeleteBorrow = async (data) => {
    try {
        const result = await http.delete("/borrow/delete-borrow", data);
        return result
    } catch (error) {
        console.log(error);
    }
}