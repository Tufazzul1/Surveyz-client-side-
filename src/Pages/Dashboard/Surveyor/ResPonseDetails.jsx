import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";
import Loading from "../../../Components/Loading/Loading";

const ResPonseDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: survey = {}, isLoading } = useQuery({
        queryKey: ["survey", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/vote/${id}`);
            return data;
        },
    });


    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <Helmet>
                <title>Response Details | Surveyz</title>
            </Helmet>
            <PagesHeader header={'Survey Response'}></PagesHeader>

            <div className="overflow-x-auto p-4 md:p-10">
                <table className="table table-zebra">
                    <thead className="text-white bg-[#007BFF]">
                        <tr>
                            <th></th>
                            <th>Serial No</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>Vote</th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <th></th>
                            <td>{1}</td>
                            <td>{survey?.voter?.voter_email}</td>
                            <td>{survey?.voter?.voter_name}</td>
                            <td>
                                {survey?.totalVote + 1}
                            </td>
                            <td></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResPonseDetails;