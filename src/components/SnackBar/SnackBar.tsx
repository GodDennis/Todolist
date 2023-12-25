import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { SetErrorAC } from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return (
        <MuiAlert
            elevation={6}
            ref={ref}
            variant='filled'
            {...props}
        />
    );
});

export function SimpleSnackbar() {
    const dispatch = useAppDispatch();
    const error = useAppSelector<null | string>(state => state.app.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        dispatch(SetErrorAC(null));
    };

    return (
        <Stack
            spacing={2}
            sx={{ width: "100%" }}>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity='error'
                    sx={{ width: "100%" }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
