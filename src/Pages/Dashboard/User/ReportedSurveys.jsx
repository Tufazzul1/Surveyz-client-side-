import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { Helmet } from "react-helmet";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";


const ReportedSurveys = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: surveys = [], isLoading } = useQuery({
        queryKey: ['surveys', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/userReports/${user?.email}`);
            console.log(data)
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <Helmet>
                <title>Reports | Surveyz</title>
            </Helmet>
            <PagesHeader header={'Reported Surveys'}></PagesHeader>

            <div className="overflow-x-auto p-4 md:p-10">
                <table className="table table-zebra">
                    <thead className="text-white bg-[#007BFF]">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey, index) => (
                            <tr key={survey._id}>
                                <th>{index + 1}</th>
                                <td>{survey?.title}</td>
                                <td>{survey?.category}</td>
                                <td>{survey?.feedBack}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedSurveys;



