import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns'; 
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";
import Loading from "../../../Components/Loading/Loading";

const SurveyorSurveys = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: surveys = [], isLoading } = useQuery({
        queryKey: ['surveys', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/surveys/${user?.email}`);
            // console.log(data)
            return data;
        }
    });

    // console.log(surveys);

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <Helmet>
                <title>Survey Response | Surveyz</title>
            </Helmet>
            <PagesHeader header={'Surveyor Details'}></PagesHeader>

            <div className="overflow-x-auto p-4 md:p-10">
                <table className="table table-zebra">
                    <thead className="text-white bg-[#007BFF]">
                        <tr>
                            <th>#</th>
                            <th>_ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Creation Time</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey, index) => (
                            <tr key={survey._id}>
                                <th>{index + 1}</th>
                                <td>_Id = {survey?._id}</td>
                                <td>{survey?.title}</td>
                                <td>{survey?.category}</td>
                                <td>{survey?.timestamp ? format(new Date(survey.timestamp), 'PPpp') : 'N/A'}</td>
                                <td>
                                    <Link to={`/dashboard/surveyor/response/${survey?._id}`}>
                                        <button className="btn">
                                            <TbListDetails className="text-blue-500 text-xl font-bold" />
                                        </button>
                                    </Link>
                                </td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyorSurveys;


