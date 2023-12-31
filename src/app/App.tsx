import React, { useEffect } from "react";
import "./App.css";
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { useAppDispatch, useAppSelector } from "./store";
import { RequestStatusType } from "./app-reducer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Menu } from "@mui/icons-material";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Login } from "../features/Login/Login";
import { AuthMeTC, DeleteAuthMeTC } from "../auth/authReducer";

function App() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const status = useAppSelector<RequestStatusType>(state => state.app.status);
    useEffect(() => {
        dispatch(AuthMeTC());
    }, []);

    const logoutHandler = () => {
        dispatch(DeleteAuthMeTC());
    };

    if (isInitialized) {
        return <CircularProgress />;
    } else {
        return (
            <div className='App'>
                <ErrorSnackbar />
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='menu'>
                            <Menu />
                        </IconButton>
                        <Typography variant='h6'>News</Typography>
                        {isLoggedIn && (
                            <Button
                                onClick={logoutHandler}
                                color='inherit'>
                                Logout
                            </Button>
                        )}
                    </Toolbar>
                    {status === "loading" && <LinearProgress />}
                </AppBar>
                <Container fixed>
                    <RouterProvider router={router} />
                </Container>
            </div>
        );
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <TodolistsList />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/*",
        element: <Navigate to={"/404"} />,
    },
    {
        path: "/404",
        element: <div>ERROR 404 NOT FOUND</div>,
    },
]);

export default App;
