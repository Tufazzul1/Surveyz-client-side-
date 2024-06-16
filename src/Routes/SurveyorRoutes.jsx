import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useSurveyor from "../Hooks/useSurveyor";



const AdminRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [isSurveyor, isSurveyorLoading] = useSurveyor();
    const location = useLocation();

    if (loading || isSurveyorLoading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }
    if (user && isSurveyor) {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;