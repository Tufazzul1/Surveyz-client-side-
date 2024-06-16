import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";


const Statistics = () => {
    const {user} = useAuth();
    console.log(user)
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Helmet>
               <title> Statistic | Dashboard</title>
            </Helmet>
            <h2 className="text-3xl">Welcome to Dashboard : <span className="font-bold">{user?.displayName}</span></h2>
        </div>
    );
};

export default Statistics;