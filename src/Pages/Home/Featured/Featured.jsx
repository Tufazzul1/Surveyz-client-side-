// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../../Components/Loading/Loading";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import SectionTitle from "../../../Components/Sectiontitle/SectionTitle";
// import { FaExternalLinkAlt } from "react-icons/fa";

// const FeaturedSurvey = () => {

//   const [sort] = useState("voteCount_DESC");
//   const axiosPublic = useAxiosPublic();
//   const fetchTopVotes = async ({ queryKey }) => {
//     const [sort] = queryKey;
//     const { data } = await axiosPublic.get(`/surveys?sort=${sort}`);
//     return data;
//   };

//   const { data: topVotes = [], isLoading, isError, error } = useQuery({
//     queryKey: ["topVotes", sort],
//     queryFn: fetchTopVotes,
//     keepPreviousData: true,
//   });

//   if (isLoading) {
//     return <Loading></Loading>;
//   }

//   if (isError) {
//     return <div>Error fetching surveys: {error.message}</div>;
//   }

//   return (
//     <div className="mb-10">
//       <SectionTitle title={'Featured Surveys'} subTitle={'Explore the top surveys highlighted for you. Join the discussion and make your voice heard on key topics and current trends.'}></SectionTitle>
//       <div>
//         <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
//           {topVotes?.map((survey, index) => (
//             <div key={index} className="card h-auto text-gray-500 min-h-[270px] bg-gray-100">
//               <div className="p-4 md:p-8">
//                 <h2 className="text-xl font-bold text-gray-500 mb-3">{survey.title}</h2>
//                 <p>{survey.description}</p>
//                 <div className="flex justify-center mt-3">
//                   <div className="stats shadow">
//                     <div className="stat">
//                       <div className="stat-title">Total Vote Count</div>
//                       <div className="stat-value text-center text-gray-500">{survey?.voteCount || 0}</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <Link to={`/surveyDetails/${survey?._id}`}>
//                     <button className="btn btn-sm btn-info text-white ">View Details</button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-center items-center mt-8">
//         <Link
//           to="/surveys"
//           className="btn btn-outline btn-info flex justify-center items-center"
//         >
//           See All Surveys <FaExternalLinkAlt className=' ml-2 text-blue-300' />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default FeaturedSurvey;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Components/Sectiontitle/SectionTitle";
import { FaExternalLinkAlt } from "react-icons/fa";

const FeaturedSurvey = () => {

  const [sort] = useState("voteCount_DESC");
  const axiosPublic = useAxiosPublic();
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error fetching surveys: {error.message}</div>;
  }

  return (
    <div className="mb-10">
      <SectionTitle title={'Featured Surveys'} subTitle={'Explore the top surveys highlighted for you. Join the discussion and make your voice heard on key topics and current trends.'} />
      <div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {topVotes?.map((survey, index) => (
            <div 
              key={index} 
              className="card h-auto text-gray-500 min-h-[270px] bg-gray-100 relative overflow-hidden group"
            >
              <div className="p-4 md:p-8">
                <h2 className="text-xl font-bold text-gray-500 mb-3">{survey.title}</h2>
                <p>{survey.description}</p>
                <div className="flex justify-center mt-3">
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Total Vote Count</div>
                      <div className="stat-value text-center text-gray-500">{survey?.voteCount || 0}</div>
                    </div>
                  </div>
                </div>
                <div 
                  className="absolute inset-0 bg-gray-100 bg-opacity-70 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-400 ease-in-out"
                >
                  <Link to={`/surveyDetails/${survey?._id}`}>
                    <button className="btn btn-sm btn-info text-white">View Details <FaExternalLinkAlt className="ml-2" /></button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link
          to="/surveys"
          className="btn btn-outline btn-info flex justify-center items-center"
        >
          See All Surveys <FaExternalLinkAlt className='ml-2 text-blue-300' />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSurvey;




