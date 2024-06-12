import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";
import { useState } from "react";
import toast from "react-hot-toast";

const SurveyComponent = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [feedback, setFeedback] = useState("");

    const fetchAllSurveys = async () => {
        try {
            const { data } = await axiosSecure.get('/allSurveys');
            return data;
        } catch (error) {
            console.error('Error fetching surveys:', error);
            return [];
        }
    };

    const { data: surveys = [], isLoading } = useQuery({
        queryKey: ['surveys'],
        queryFn: fetchAllSurveys,
    });

    const mutation = useMutation({
        mutationFn: ({ id, newStatus, feedback }) => axiosSecure.put(`/surveys/${id}/status`, { status: newStatus, feedback }),
        onSuccess: () => {
            queryClient.invalidateQueries(['surveys']);
            toast.success("Survey status updated successfully!");
        },
        onError: (error) => {
            console.error('Failed to update survey status', error);
            toast.error("Failed to update survey status.");
        }
    });

    const handleStatusToggle = (survey) => {
        const newStatus = survey.status === 'publish' ? 'unpublish' : 'publish';
        mutation.mutate({ id: survey._id, newStatus, feedback });
        setFeedback("");
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <PagesHeader header={'Publish/Unpublish Surveys'} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {surveys.map((survey) => (
                    <div key={survey._id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold mb-2">{survey.title}</h3>
                        <h3 className="text-lg mb-2">{survey.category}</h3>
                        <p className="mb-2">Status: <span className={`font-semibold ${survey.status === 'publish' ? 'text-green-600' : 'text-red-600'}`}>{survey.status}</span></p>

                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Send Feedback</button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Send Your Feedback Here</h3>
                                <textarea
                                    className="w-full border rounded p-2 mb-2"
                                    placeholder="Feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <button
                            onClick={() => handleStatusToggle(survey)}
                            className={`ml-3 py-2 px-4 rounded text-white ${survey.status === 'publish' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                            {survey.status === 'publish' ? 'Unpublish' : 'Publish'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyComponent;

