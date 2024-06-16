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
import Payment from "../Pages/Pricing/Payment";
import Vote from "../Pages/SurveyDetails/Vote";
import PerticipatedSurveys from "../Pages/Dashboard/User/PerticipatedSurveys";
import CommentedSurveys from "../Pages/Dashboard/ProUser/CommentedSurveys";
import ReportedSurveys from "../Pages/Dashboard/User/ReportedSurveys";
import AdminRoutes from "./AdminRoutes";
import SurveyorRoutes from "./SurveyorRoutes";
import SurveyorSurveys from "../Pages/Dashboard/Surveyor/SurveyorSurveys";
import ResPonseDetails from "../Pages/Dashboard/Surveyor/ResPonseDetails";
import Update from "../Pages/Dashboard/Surveyor/Update";


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
                element: <PrivateRoute><SurveyDetails></SurveyDetails></PrivateRoute>,
                loader: ({ params }) =>fetch(`https://surveyz-server.vercel.app/surveyDetails/${params.id}`),
            },
            {
                path: "/votes/:id",
                element: <PrivateRoute><Vote></Vote></PrivateRoute>,
                loader: ({ params }) =>fetch(`https://surveyz-server.vercel.app/surveyDetails/${params.id}`),
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
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path: 'serveys',
                element: <AdminRoutes><AdminSurveys></AdminSurveys></AdminRoutes>
            },
            {
                path: 'viewPayments',
                element: <AdminRoutes><ViewPayments></ViewPayments></AdminRoutes>
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
                element: <SurveyorRoutes><AddSurvey></AddSurvey></SurveyorRoutes>
            },
            {
                path: 'updateSurveys',
                element: <SurveyorRoutes><UpdateSurvey></UpdateSurvey></SurveyorRoutes>
            },
            {
                path: 'update/:id',
                element: <SurveyorRoutes><Update></Update></SurveyorRoutes>
            },
            {
                path: 'surveyorDetails',
                element: <SurveyorRoutes><SurveyorSurveys></SurveyorSurveys></SurveyorRoutes>
            },
            {
                path: 'response/:id',
                element: <SurveyorRoutes><ResPonseDetails></ResPonseDetails></SurveyorRoutes>
            }
        ]
    },
    // user routes
    {
        path: 'dashboard/user',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Statistics></Statistics>
            },
            {
                path: 'serveys',
                element: <PerticipatedSurveys></PerticipatedSurveys>
            },
            {
                path: 'reported',
                element: <ReportedSurveys></ReportedSurveys>
            },
            {
                path: 'commented',
                element: <CommentedSurveys></CommentedSurveys>
            },
        ]
    },
]);