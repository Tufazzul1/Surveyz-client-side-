import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";



const CommentedSurveys = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: surveys = [], isLoading } = useQuery({
        queryKey: ['surveys', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/userComment/${user?.email}`);
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
                <title>Comments | Surveyz</title>
            </Helmet>
            <PagesHeader header={'Perticipated Surveys'}></PagesHeader>

            <div className="overflow-x-auto p-4 md:p-10">
                <table className="table table-zebra">
                    <thead className="text-white bg-[#007BFF]">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys?.map((survey, index) => (
                            <tr key={survey._id}>
                                <th>{index + 1}</th>
                                <td>{survey?.title}</td>
                                <td>{survey?.category}</td>
                                <td>{survey?.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CommentedSurveys;