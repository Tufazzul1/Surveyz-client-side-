import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useProUser from "../../Hooks/useProUser";
import { Helmet } from "react-helmet";
import { FaArrowCircleRight } from "react-icons/fa";

const Vote = () => {
    const survey = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [voteOption, setVoteOption] = useState("");
    const axiosSecure = useAxiosSecure();
    const [isProUser] = useProUser();

    const { mutateAsync } = useMutation({
        mutationFn: async (voteSurveyData) => {
            const { data } = await axiosSecure.post("/votes", voteSurveyData);
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                position: "top",
                icon: "success",
                title: `${user?.displayName} Send Your Vote Successfully`,
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/surveys");
        },
    });

    const {
        _id,
        title,
        description,
        option,
        category,
        deadline,
        status,
        surveyor,
        timestamp,
    } = survey || {};

    console.log(survey)

    const handleVoteSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment ? form.comment.value : "";
        const voter_email = user?.email;
        const voter_name = user?.displayName;
        const voter_image = user?.photoURL;
        const totalVote = parseInt(survey?.voteCount);
        const voteCount = parseInt(0);
        const voter = {
            voter_email,
            voter_name,
            voter_image,
        };

        try {
            const voteSurveyData = {
                voteId: _id,
                voter,
                voteOption,
                comment,
                voteCount,
                title,
                description,
                option,
                category,
                deadline,
                status,
                surveyor,
                timestamp,
                totalVote,
            };

            console.log("Survey Data:", voteSurveyData);

            // Post data in backend
            await mutateAsync(voteSurveyData);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="w-full h-full mt-12 md:mt-20 lg:mt-24">
            <Helmet>
                <title>Surveyz| Vote</title>
            </Helmet>

            <div className="flex justify-center items-center">
                <div className=" text-black bg-gray-100 max-w-xl  px-10 py-6 rounded-lg shadow-2xl">
                    <div className="mt-3">
                        <h2 className="text-2xl font-bold">{category}</h2>
                    </div>

                    <h3 className="text-xl font-semibold my-3 mt-10">
                        What is your opinion?
                    </h3>

                    <div className="">
                        <form onSubmit={handleVoteSubmit}>
                            <div className="flex gap-12">
                                <div className="flex items-center gap-1">
                                    <label className="text-lg font-semibold" htmlFor="yes">
                                        Yes
                                    </label>
                                    <input
                                        type="radio"
                                        id="yes"
                                        name="option"
                                        value="yes"
                                        checked={voteOption === "yes"}
                                        onChange={(e) => setVoteOption(e.target.value)}
                                        className="mt-[2px]"
                                    />
                                </div>
                                <br />
                                <div className="flex items-center gap-1">
                                    <label className="text-lg font-semibold" htmlFor="no">
                                        No
                                    </label>
                                    <input
                                        type="radio"
                                        id="no"
                                        name="option"
                                        value="no"
                                        checked={voteOption === "no"}
                                        onChange={(e) => setVoteOption(e.target.value)}
                                        className="mt-[2px]"
                                    />
                                </div>
                            </div>
                            {isProUser ? (
                                <div className="mt-8">
                                    <label className="text-lg font-semibold" htmlFor="comment">
                                        Add Your Comment
                                    </label>
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        placeholder="Add your comment"
                                        className="textarea text-blue-500 textarea-bordered row-span-2 w-full"
                                    ></textarea>
                                </div>
                            ) : (
                                <div className="mt-8 text-lg font-semibold">
                                    To get comment here be <Link className="link link-primary inline-flex items-center" to={'/pricing'}>
                                        Pro-user <FaArrowCircleRight className="ml-1" />
                                    </Link>
                                </div>
                            )}
                            <br />
                            <input
                                type="submit"
                                value="Submit"
                                className="btn w-full bg-green-500 text-white text-lg border-0 rounded-xl"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vote;
