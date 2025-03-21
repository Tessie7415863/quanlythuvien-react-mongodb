import { http } from "../../../Utils/baseUrl";

export const CallUpdateBorrow = async (data) => {
    try {
        const result = await http.put("/borrow/update-borrow", data);
        return result
    } catch (error) {
        console.log(error);
    }
}