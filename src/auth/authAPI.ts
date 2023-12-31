import { ResponseType, instance } from "../api/todolists-api";
import { dataType } from "../features/Login/Login";

export const authAPI = {
    login(params: dataType) {
        return instance.post<ResponseType<{ userId: number }>>("auth/login", params);
    },
    authMe() {
        return instance.get<ResponseType<{ id: number }>>("auth/me");
    },
    delete() {
        return instance.delete<ResponseType<{ id: number }>>("auth/login");
    },
};
