import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";

const AdminSurveys = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [feedback, setFeedback] = useState("");
    const [currentSurvey, setCurrentSurvey] = useState(null);

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
            setFeedback("");
        },
        onError: (error) => {
            console.error('Failed to update survey status', error);
            toast.error("Failed to update survey status.");
        }
    });

    const handleStatusToggle = (survey) => {
        const newStatus = survey.status === 'publish' ? 'unPublish' : 'publish';
        mutation.mutate({ id: survey._id, newStatus, feedback });
        setFeedback("");
        setCurrentSurvey(null);
    };

    if (isLoading) return <p>loading</p>;

    return (
        <div className="p-6">
            <PagesHeader header={'Manage Survey'}></PagesHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {surveys.map((survey) => (
                    <div key={survey._id} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold mb-2">{survey.title}</h3>
                        <h3 className="text-lg mb-2">{survey.category}</h3>
                        <p className="mb-2">Status: <span className={`font-semibold ${survey.status === 'publish' ? 'text-green-600' : 'text-red-600'}`}>{survey.status}</span></p>

                        <button
                            className="btn w-full btn-primary"
                            onClick={() => setCurrentSurvey(survey)}
                        >
                            Send Feedback
                        </button>

                        {currentSurvey && currentSurvey._id === survey._id && (
                            <dialog open className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Send Your Feedback Here</h3>
                                    <textarea
                                        className="w-full border rounded p-2 mb-2"
                                        placeholder="Feedback"
                                        required
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleStatusToggle(survey)}
                                        className={`ml-3 py-2 px-4 rounded text-white ${survey.status === 'publish' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                    >
                                        {survey.status === 'publish' ? 'UnPublish' : 'Publish'}
                                    </button>
                                    <div className="modal-action">
                                        <button className="btn" onClick={() => setCurrentSurvey(null)}>Close</button>
                                    </div>
                                </div>
                            </dialog>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSurveys;