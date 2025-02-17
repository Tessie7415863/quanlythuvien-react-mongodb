import { http } from "../../../Utils/baseUrl"

export const CallCreateUser = async (data) => {
    try {
        const result = await http.post("/users/create-user", data)
        return result
    } catch (err) {
        return err
    }
}
