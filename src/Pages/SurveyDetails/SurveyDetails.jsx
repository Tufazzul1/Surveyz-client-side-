
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Helmet } from 'react-helmet-async';
import {Button,Dialog,DialogPanel,DialogTitle,Transition,TransitionChild,}from'@headlessui/react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import useSurveyor from "../../Hooks/useSurveyor";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Components/Loading/Loading";

const SurveyDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();

    const { data: survey = {}, isLoading } = useQuery({
        queryKey: ["survey", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/surveyDetails/${id}`);
            return data;
        },
    });

    const {
        _id,
        title,
        description,
        option,
        category,
        startDate,
        endDate,
        status,
        surveyor,
        timestamp,
    } = survey || {};

    const handleOpen = () => {
        if (!user) {
            navigate("/login");
            return toast.error("Please login to add gallery");
        }
        open();
    };

    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    const handleAddReport = async (e) => {
        e.preventDefault();
        const form = e.target;
        const userName = user ? user.displayName : "";
        const userEmail = user ? user.email : "";
        const description = form.description.value;
        const totalVote = parseInt(survey?.voteCount);
        const newData = {
            userName,
            userEmail,
            feedBack: description,
            surveyId: _id,
            title,
            option,
            category,
            startDate,
            endDate,
            status,
            surveyor,
            timestamp,
            totalVote,
        };

        try {
            const { data } = await axiosPublic.post('/reports', newData);
            if (data.insertedId) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `${user?.displayName} Send Your Report Successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            navigate("/surveys");
            setIsOpen(false);
        } catch (error) {
            console.error("Error adding report:", error);
        }
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    const formattedTimestamp = timestamp
        ? format(new Date(timestamp), "PPp")
        : "";

    return (
        <div className="w-full h-full mt-12 md:20 lg:mt-24">
            <Helmet>
                <title>Details-{_id}</title>
            </Helmet>

            <div className=" text-black bg-white max-w-2xl px-8 py-6 mx-auto rounded-lg shadow-lg border border-gray-300">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{formattedTimestamp}</span>
                    <p className={`badge badge-secondary ${status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                        Status: {status}
                    </p>
                </div>
                <div className="mt-3">
                    <h2 className="text-3xl font-bold text-[#007BFF] hover:underline mb-4">
                        {title}
                    </h2>
                    <p className="mt-2 text-gray-700">{description}</p>
                </div>
                <h3 className="text-xl my-3 text-gray-800">Category: {category}</h3>
                <h3 className="text-xl text-green-600 my-3">Start Date: {startDate}</h3>
                <h3 className="text-xl text-red-600 my-3">End Date: {endDate}</h3>
                <h3 className="text-xl text-green-600 my-3">Total Vote Count: {survey?.voteCount || 0}</h3>
                <div className="flex items-center justify-between mt-6">
                    <Link
                        to={`/votes/${_id}`}
                        className={`btn bg-[#007BFF] text-white font-bold ${isAdmin || isSurveyor ? 'disabled:opacity-50' : ''}`}
                    >
                        Vote Now
                    </Link>
                    <div>
                        <Button
                            onClick={handleOpen}
                            className={`btn btn-error py-2 px-6 font-bold text-white ${isAdmin || isSurveyor ? 'disabled:opacity-50' : ''}`}
                        >
                            Report
                        </Button>

                        <Transition appear show={isOpen}>
                            <Dialog
                                as="div"
                                className="relative z-10"
                                onClose={close}
                            >
                                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4">
                                        <TransitionChild
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 transform scale-95"
                                            enterTo="opacity-100 transform scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 transform scale-100"
                                            leaveTo="opacity-0 transform scale-95"
                                        >
                                            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg border border-gray-200">
                                                <DialogTitle
                                                    as="h3"
                                                    className="text-2xl font-bold text-center text-red-500"
                                                >
                                                    Report Now
                                                </DialogTitle>
                                                <form onSubmit={handleAddReport}>
                                                    <div className="form-control mb-4">
                                                        <label className="label">
                                                            <span className="label-text text-base font-semibold">
                                                                User Name
                                                            </span>
                                                        </label>
                                                        <input
                                                            value={user ? user.displayName : ""}
                                                            readOnly
                                                            type="text"
                                                            name="name"
                                                            placeholder="User Name"
                                                            className="input input-bordered w-full"
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-control mb-4">
                                                        <label className="label">
                                                            <span className="label-text text-base font-semibold">
                                                                Feedback
                                                            </span>
                                                        </label>
                                                        <textarea
                                                            placeholder="Feedback"
                                                            name="description"
                                                            className="textarea textarea-bordered w-full"
                                                            required
                                                        ></textarea>
                                                    </div>
                                                    <input
                                                        type="submit"
                                                        value="Send Report"
                                                        className="btn w-full mt-5 bg-red-600 text-base text-white border-0 rounded-full"
                                                    />
                                                </form>
                                                <div className="mt-4">
                                                    <Button
                                                        className="btn text-white bg-[#007BFF] border-0 text-lg px-8 py-2 rounded-full"
                                                        onClick={close}
                                                    >
                                                        Close
                                                    </Button>
                                                </div>
                                            </DialogPanel>
                                        </TransitionChild>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyDetails;

