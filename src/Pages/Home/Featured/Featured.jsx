
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../Components/Sectiontitle/SectionTitle";
import { FaArrowCircleRight } from "react-icons/fa";

const Featured = () => {
  const { loading: authLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  
  const sort = "voteCount_DESC";  

  const fetchTopVotes = async ({ queryKey }) => {
    const [sort] = queryKey;
    const { data } = await axiosPublic.get(`/surveys?sort=${sort}`);
    return data;
  };

  const { data: topVotes = [], isLoading, isError, error } = useQuery({
    queryKey: ["topVotes", sort],
    queryFn: fetchTopVotes,
    keepPreviousData: true,
  });

  if (isLoading || authLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <div>Error fetching surveys: {error.message}</div>;
  }

  return (
    <div className="mb-10">
      <SectionTitle title={'Featured Surveys'} subTitle={'Explore the top surveys highlighted for you. Join the discussion and make your voice heard on key topics and current trends.'}></SectionTitle>
      <div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {topVotes.map((survey, index) => (
            <div key={index} className="card h-auto text-black min-h-[270px] bg-gray-100">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{survey.title}</h2>
                <p>{survey.description}</p>
                <h3 className="text-[#4682B4] text-lg">Total Vote Count: ({survey?.voteCount || 0})</h3>
              </div>
              <Link to={`/surveyDetails/${survey?._id}`}>
                <button className="btn btn-info text-white border-0 text-center block rounded-xl text-base mb-6 mx-auto">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link
          to="/surveys"
          className="btn btn-outline btn-info flex justify-center items-center"
        >
          See All Surveys <FaArrowCircleRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default Featured;

