import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginTC } from "../../auth/authReducer";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Navigate } from "react-router-dom";

export type dataType = {
    email: string;
    password: string;
    rememberME: boolean;
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(3, "Password can't be below 3 symbol").required("Required"),
});

export const Login = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();
    const { handleSubmit, getFieldProps, values, errors, touched } = useFormik<dataType>({
        initialValues: {
            email: "",
            password: "",
            rememberME: false,
        },
        onSubmit(values) {
            dispatch(loginTC(values));
        },
        // validate(values) {
        //     const errors: Partial<dataType> = {};

        //     if (!values.email) {
        //         errors.email = "Required";
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = "Invalid email address";
        //     }

        //     if (values.password.length < 3) {
        //         errors.password = "password length can't be bellow 3 symbols";
        //     }
        //     return errors;
        // },
        validationSchema,
    });

    if (isLoggedIn) {
        return <Navigate to='/' />;
    }

    return (
        <Grid
            container
            justifyContent={"center"}>
            <Grid
                item
                justifyContent={"center"}>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a
                                    href={"https://social-network.samuraijs.com/"}
                                    target={"_blank"}>
                                    {" "}
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label='Email'
                                margin='normal'
                                {...getFieldProps("email")}
                            />
                            {errors.email && touched.email && (
                                <p style={{ color: "red" }}>{errors.email}</p>
                            )}
                            <TextField
                                type='password'
                                label='Password'
                                margin='normal'
                                {...getFieldProps("password")}
                            />
                            {errors.password && touched.password && (
                                <p style={{ color: "red" }}>{errors.password}</p>
                            )}
                            <FormControlLabel
                                label={"Remember me"}
                                control={<Checkbox {...getFieldProps("rememberME")} />}
                            />
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
