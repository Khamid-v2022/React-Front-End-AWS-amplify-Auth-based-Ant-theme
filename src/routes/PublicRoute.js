import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserAuthenticationContext } from "../Components/providers/UserAuthenticationProvider";

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useContext(UserAuthenticationContext);

    return (
        (!isLoggedIn) ? <Outlet /> : <></>
    );
};

export default PublicRoute;