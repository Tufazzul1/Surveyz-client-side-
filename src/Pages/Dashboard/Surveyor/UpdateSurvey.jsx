

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdOutlineUpdate } from "react-icons/md";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";
import Loading from "../../../Components/Loading/Loading";

const UpdateSurvey = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: surveys = [], isLoading, isError, error } = useQuery({
    queryKey: ['surveys', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error('User email is not available');
      }
      const { data } = await axiosSecure.get(`/surveys/${user?.email}`);
      return data;
    },
    enabled: !!user?.email, // Ensures the query runs only if the user email is available
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    console.error(error); // Log the error for debugging
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Helmet>
        <title>Update | Surveyz</title>
      </Helmet>
      <PagesHeader header={'Update Survey'}></PagesHeader>

      <div className="overflow-x-auto p-4 md:p-10">
        <table className="table table-zebra">
          <thead className="text-white bg-[#007BFF]">
            <tr>
              <th>#</th>
              <th>_ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Deadline</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {surveys?.map((survey, index) => (
              <tr key={survey._id}>
                <th>{index + 1}</th>
                <td>{survey._id}</td>
                <td>{survey.title}</td>
                <td>{survey.category}</td>
                <td>{survey.endDate}</td>
                <td>
                  <Link to={`/dashboard/surveyor/update/${survey._id}`}>
                    <button className="btn">
                      <MdOutlineUpdate className="text-[#007BFF] text-xl font-bold" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateSurvey;

