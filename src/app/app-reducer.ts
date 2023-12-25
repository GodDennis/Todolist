export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
    status: "loading" as RequestStatusType,
    error: null as null | string,
};

export type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return { ...state, status: action.status };
        case "APP/SET-ERROR": {
            return { ...state, error: action.error };
        }
        default:
            return state;
    }
};

export const SetStatusAC = (status: RequestStatusType) => {
    return { type: "APP/SET-STATUS", status } as const;
};
export const SetErrorAC = (error: string | null) => {
    return { type: "APP/SET-ERROR", error } as const;
};

type AppActionType = setStatusType | setErrorType;

export type setStatusType = ReturnType<typeof SetStatusAC>;
export type setErrorType = ReturnType<typeof SetErrorAC>;
