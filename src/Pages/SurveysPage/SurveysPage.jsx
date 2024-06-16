import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PagesHeader from "../../Components/PagesHeader/PagesHeader";
import Loading from "../../Components/Loading/Loading";

const SurveysPage = () => {
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const axiosPublic = useAxiosPublic();

    // Fetch surveys data
    const {
        data: surveys = [],
        isLoading,
    } = useQuery({
        queryKey: ["surveys", currentPage, itemsPerPage, filter, sort, search],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-surveys", {
                params: { page: currentPage, size: itemsPerPage, filter, sort, search },
            });
            return data.surveys;
        },
    });


    // Fetch count data
    const { data: countData } = useQuery({
        queryKey: ["count", filter, search],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/surveys-count", {
                params: { filter, search },
            });
            return data.count;
        },
    });

    useEffect(() => {
        if (countData !== undefined) {
            setCount(countData);
        }
    }, [countData]);

    // Calculate the number of pages
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

    const handlePaginationButton = (value) => {
        setCurrentPage(value);
    };

    const handleReset = () => {
        setFilter("");
        setSort("");
        setSearch("");
        setSearchText("");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchText);
    };

    return (
        <div className="flex flex-col justify-between">
            <div>
                <Helmet>
                    <title>Surveye Page | Surveyz</title>
                </Helmet>
                <PagesHeader
                    header={'All Surveys'}>

                </PagesHeader>
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
                    {/* Filter dropdown */}
                    <div>
                        <select
                            onChange={(e) => {
                                setFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={filter}
                            name="category"
                            id="category"
                            className="border p-4 rounded-lg"
                        >
                            <option value="">Filter By Category</option>
                            <option value="Customer Satisfaction Surveys">Customer Satisfaction Surveys</option>
                            <option value="Employee Engagement Surveys">Employee Engagement Surveys</option>
                            <option value="Market Research Surveys">Market Research Surveys</option>
                            <option value="Academic and Educational Surveys">Academic and Educational Surveys</option>
                            <option value="Healthcare Surveys">Healthcare Surveys</option>

                        </select>
                    </div>

                    {/* Search input */}
                    <form onSubmit={handleSearch}>
                        <div className="flex p-1 overflow-hidden border rounded-lg">
                            <input
                                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                                type="text"
                                onChange={(e) => setSearchText(e.target.value)}
                                value={searchText}
                                name="search"
                                placeholder="Enter Survey Title"
                                aria-label="Enter Survey Title"
                            />
                            <button className="btn btn-outline btn-info">
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Sort dropdown */}
                    <div>
                        <select
                            onChange={(e) => {
                                setSort(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={sort}
                            name="sort"
                            id="sort"
                            className="border p-4 rounded-md"
                        >
                            <option className="" value="">Sort By Vote Count</option>
                            <option value="dsc">Descending Order</option>
                            <option value="asc">Ascending Order</option>
                        </select>
                    </div>
                    <button onClick={handleReset} className="btn btn-outline btn-info">
                        Reset
                    </button>
                </div>

                {/* Display surveys */}
                <div className="grid grid-cols-1 gap-6 mt-8 xl:mt-16 md:grid-cols-3 p-6">
                    {isLoading ? (
                        <Loading></Loading>
                    ) : (
                        surveys.map((survey, index) => (
                            <div key={index}>
                                <div className="card bg-base-200 border border-blue-400">
                                    <div className="card-body">
                                        <h2 className="card-title">{survey.title}</h2>
                                        <p>{survey.description}</p>
                                        <h3>Total Vote : {survey.voteCount || 0}</h3>
                                        <Link to={`/surveyDetails/${survey?._id}`}>
                                            <button className="btn btn-sm btn-outline btn-info">
                                                View details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Pagination Section */}
            <div className="flex justify-center mt-12">
                {/* Previous Button */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#007BFF]
                     hover:text-white"
                >
                    <div className="flex items-center -mx-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mx-1 rtl:-scale-x-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                        <span className="mx-1">previous</span>
                    </div>
                </button>
                {/* Numbers */}
                {pages.map((btnNum) => (
                    <button
                        onClick={() => handlePaginationButton(btnNum)}
                        key={btnNum}
                        className={`hidden ${currentPage === btnNum ? "bg-[#007BFF] text-white" : ""
                            } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-[#007BFF] hover:text-white`}
                    >
                        {btnNum}
                    </button>
                ))}
                {/* Next Button */}
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className="px-4 bg-[#007BFF] text-white rounded-md"
                >
                    <div className="flex items-center -mx-1">
                        <span className="mx-1">Next</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 mx-1 rtl:-scale-x-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SurveysPage;

