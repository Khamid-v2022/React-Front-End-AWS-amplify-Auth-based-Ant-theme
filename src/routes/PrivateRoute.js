import React, { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { UserAuthenticationContext } from "../Components/providers/UserAuthenticationProvider";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoggingIn } = useContext(UserAuthenticationContext);

    return (
        (!isLoggedIn && !isLoggingIn) ? <Navigate to="/signin" />:<Outlet /> 
    );
};

export default PrivateRoute;
  