import { http } from "../../../Utils/baseUrl";

export const CallCreateBorrow = async (data) => {
    try {
        const result = await http.post("/borrow/create-borrow", data);
        return result
    } catch (error) {
        console.log(error);
    }
}