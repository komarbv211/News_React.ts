import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuth } from "../redux/account/accountSlice";
interface ProtectedRouteProps {
    children: JSX.Element;
    //allowedRoles: ("admin" | "user" | "author")[]; 
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
        const isAuth = useAppSelector(selectIsAuth);
    if (!isAuth) // if user is not authenticated, re-direct to login -- status 401
        return <Navigate to="/login" />;
    return children; // return the right page if user is cleared.
};