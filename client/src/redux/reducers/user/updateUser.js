import { http } from "../../../Utils/baseUrl"

export const CallUpdateUser = async (id, data) => {
    try {
        const result = await http.put(`/users/update-user/${id}`, data)
        console.log(result);

        return result
    } catch (err) {
        return err
    }
}