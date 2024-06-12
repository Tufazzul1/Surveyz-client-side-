import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Components/Sectiontitle/SectionTitle";

const LatestSurveys = () => {

    const [sort, setSort] = useState("timestamp_DESC");
    const axiosPublic = useAxiosPublic();

    const fetchSurveys = async ({ queryKey }) => {
        const [, sort] = queryKey;
        const { data } = await axiosPublic.get(`/allSurveys?sort=${sort}`);
        return data;
    };

    const { data: latest = [], isLoading, isError, error } = useQuery({
        queryKey: ["latestSurveys", sort],
        queryFn: fetchSurveys,
        keepPreviousData: true,
    });

    if (isLoading) {
        return <p>Loading.....</p>;
    }

    if (isError) {
        return <div>Error fetching surveys: {error.message}</div>;
    }

    return (
        <div className="mb-10">

            <SectionTitle title={'Latest Surveys Section'}
                subTitle={'Join the conversation with our latest surveys. Voice your opinion, share your thoughts, and see what others think about the most current topics. Your input matters!'}></SectionTitle>
            {/* <div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 ">
          {latest.map((survey, index) => (
            <div
              key={index}
              className="card h-auto min-h-[270px] text-black bg-[#f0faf4]"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{survey.title}</h2>
                <p>{survey.description}</p>
                <h3 className="text-[#5C4033] text-lg ">
                  Total Vote Count: ({survey?.voteCount || 0})
                </h3>
              </div>
              <Link to={`/surveyDetails/${survey?._id}`}>
                <button className="btn btn-primary b text-center block mb-6 mx-auto">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div> */}
            <div>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
                    {latest.map((survey, index) => (
                        <div
                            key={index}
                            className="card h-auto min-h-[270px] text-black bg-white shadow-lg rounded-lg transform transition-all hover:scale-105 hover:shadow-xl"
                        >
                            <div className="card-body p-6">
                                <h2 className="card-title text-2xl font-bold mb-2">{survey.title}</h2>
                                <h2 className="text-xl mb-2">{survey.category}</h2>
                                <h2 className="mb-2">{survey.endDate}</h2>
                                <p className="text-gray-700 mb-4">{survey.description}</p>
                                <h3 className="text-[#5C4033] text-lg mb-4">
                                    Total Vote Count: <span className="font-semibold">{survey?.voteCount || 0}</span>
                                </h3>
                                <Link to={`/surveyDetails/${survey?._id}`}>
                                    <button className="btn btn-primary w-full text-center">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center mt-8">
                <Link
                    to="/surveys"
                    className="btn btn-outline btn-info  flex justify-center items-center"
                >
                    See All Surveys
                </Link>
            </div>
        </div>
    );
};

export default LatestSurveys;
