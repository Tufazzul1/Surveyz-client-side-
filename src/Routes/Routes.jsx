import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Users from "../Pages/Dashboard/Users/Users";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoutes";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";
import SurveysPage from "../Pages/SurveysPage/SurveysPage";
import SurveyDetails from "../Pages/SurveyDetails/SurveyDetails";
import Pricing from "../Pages/Pricing/Pricing";
import AddSurvey from "../Pages/Dashboard/AddSurvey/AddSurvey";


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
                path: "/surveyDetails",
                element: <SurveyDetails></SurveyDetails>
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
                element: <Users></Users>
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
            }
        ]
    }
]);