import { http } from "../../../Utils/baseUrl"

export const CallDeleteUser = async (userId) => {
    try {
        const result = await http.delete(`/users/delete-user/${userId}`)
        return result
    } catch (err) {
        return err
    }
}
