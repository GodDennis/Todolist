import { dataType } from "./../features/Login/Login";
import { Dispatch } from "redux";
import {
    SetAppErrorActionType,
    setAppInitializedAC,
    setAppStatusAC,
    SetAppStatusActionType,
} from "../app/app-reducer";
import { authAPI } from "./authAPI";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { AxiosError } from "axios";

const initialState = {
    isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return { ...state, isLoggedIn: action.value };
        case "login/SET-IS-AUTH-ME":
            return { ...state, isLoggedIn: action.value };
        case "login/DELETE-AUTH-ME": {
            return { ...state, isLoggedIn: action.value };
        }
        default:
            return state;
    }
};

// actions

export const setIsLoggedInAC = (value: boolean) =>
    ({ type: "login/SET-IS-LOGGED-IN", value } as const);
export const setIsAuthMeAC = (value: boolean) => ({ type: "login/SET-IS-AUTH-ME", value } as const);
export const deleteAuthMeAC = (value: boolean) =>
    ({ type: "login/DELETE-AUTH-ME", value } as const);

// thunks
export const DeleteAuthMeTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await authAPI.delete();
        if (res.data.resultCode === 0) {
            dispatch(deleteAuthMeAC(false));
            dispatch(setAppStatusAC("succeeded"));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    } finally {
        dispatch(setAppStatusAC("idle"));
    }
};
export const AuthMeTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppInitializedAC(true));
    try {
        const res = await authAPI.authMe();
        if (res.data.resultCode === 0) {
            dispatch(setIsAuthMeAC(true));
            dispatch(setAppStatusAC("succeeded"));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    } finally {
        dispatch(setAppStatusAC("idle"));
        dispatch(setAppInitializedAC(false));
    }
};

export const loginTC = (data: dataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    } finally {
        dispatch(setAppStatusAC("idle"));
    }
};

// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsAuthMeAC>
    | ReturnType<typeof setAppInitializedAC>
    | ReturnType<typeof deleteAuthMeAC>
    | SetAppStatusActionType
    | SetAppErrorActionType;
