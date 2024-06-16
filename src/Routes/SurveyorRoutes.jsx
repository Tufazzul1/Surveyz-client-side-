import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useSurveyor from "../Hooks/useSurveyor";
import Loading from "../Components/Loading/Loading";



const AdminRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [isSurveyor, isSurveyorLoading] = useSurveyor();
    const location = useLocation();

    if (loading || isSurveyorLoading) {
        return <Loading></Loading>
    }
    if (user && isSurveyor) {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;