import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoutes";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import SurveysPage from "../Pages/SurveysPage/SurveysPage";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import Pricing from "../Pages/Pricing/Pricing";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AddSurvey from "../Pages/Dashboard/Surveyor/AddSurvey";
import AdminSurveys from "../Pages/Dashboard/Admin/AdminSurveys";
import ViewPayments from "../Pages/Dashboard/Admin/ViewPayments";
import UpdateSurvey from "../Pages/Dashboard/Surveyor/UpdateSurvey";
import SurveyorDetails from "../Pages/Dashboard/Surveyor/SurveyorDetails";
import Payment from "../Pages/Pricing/Payment";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/surveys",
                element: <SurveysPage></SurveysPage>
            },
            {
                path: "/surveyDetails/:id",
                element: <SurveyDetails></SurveyDetails>,
                loader: ({ params }) =>fetch(`${import.meta.env.VITE_API_URL}/surveyDetails/${params.id}`),
            },
            {
                path: "/pricing",
                element: <Pricing></Pricing>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: '/payments',
                element: <Payment></Payment>
            },
        ]
    },
    // admin routes
    {
        path: 'dashboard/admin',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Statistics></Statistics>
            },
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'serveys',
                element: <AdminSurveys></AdminSurveys>
            },
            {
                path: 'viewPayments',
                element: <ViewPayments></ViewPayments>
            },
        ]
    },
    // surveyor routes
    {
        path: 'dashboard/surveyor',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Statistics></Statistics>
            },
            {
                path: 'addSurvey',
                element: <AddSurvey></AddSurvey>
            },
            {
                path: 'updateSurveys',
                element: <UpdateSurvey></UpdateSurvey>
            },
            {
                path: 'surveyorDetails',
                element: <SurveyorDetails></SurveyorDetails>
            }
        ]
    }
]);