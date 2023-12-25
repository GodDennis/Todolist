import { Dispatch } from "redux";
import { SetErrorAC, SetStatusAC, setErrorType, setStatusType } from "../app/app-reducer";
import { ResponseType } from "../api/todolists-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(SetErrorAC(data.messages[0]));
    } else {
        dispatch(SetErrorAC("Some error occurred"));
    }
    dispatch(SetStatusAC("failed"));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(SetErrorAC(error.message ? error.message : "Some error occurred"));
    dispatch(SetStatusAC("failed"));
};
