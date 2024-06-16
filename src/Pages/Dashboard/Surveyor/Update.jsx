
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import { DateRange } from 'react-date-range';
// import 'react-date-range/dist/styles.css';
// import 'react-date-range/dist/theme/default.css';
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import PagesHeader from "../../../Components/PagesHeader/PagesHeader";

// const Update = () => {
//     const survey = useLoaderData();
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();
//     const { register, handleSubmit, setValue } = useForm();

//     const [state, setState] = useState([
//         {
//             startDate: new Date(),
//             endDate: new Date(),
//             key: 'selection'
//         }
//     ]);

//     useEffect(() => {
//         if (survey) {
//             setValue('title', survey.title);
//             setValue('description', survey.description);
//             setValue('category', survey.category);
//             setValue('option', survey.option);
//             setState([
//                 {
//                     startDate: new Date(survey.startDate),
//                     endDate: new Date(survey.endDate),
//                     key: 'selection'
//                 }
//             ]);
//         }
//     }, [survey, setValue]);

//     const onSubmit = async (data) => {
//         const updatedSurvey = {
//             ...data,
//             startDate: state[0].startDate.toISOString(),
//             endDate: state[0].endDate.toISOString(),
//         };

//         try {
//             await axiosSecure.put(`/surveys/${survey._id}`, updatedSurvey);
//             Swal.fire({
//                 position: "top",
//                 icon: "success",
//                 title: `${survey?.title || 'Survey'} updated successfully`,
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//             navigate("/dashboard/survey-update");
//         } catch (error) {
//             Swal.fire({
//                 position: "top",
//                 icon: "error",
//                 title: `${error.message}`,
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     };

//     const categories = [
//         "Employee Engagement Surveys",
//         "Customer Satisfaction Surveys",
//         "Market Research Surveys",
//         "Academic and Educational Surveys",
//         "Healthcare Surveys"
//     ];

//     return (
//         <div className=" border rounded-xl p-10 mx-auto mt-12 md:mt-20 lg:mt-24">
//             <PagesHeader header={'Update Your Survey'}></PagesHeader>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium">Title</label>
//                     <input
//                         type="text"
//                         defaultValue={survey?.title}
//                         {...register('title', { required: true })}
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Description</label>
//                     <textarea
//                         {...register('description', { required: true })}
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                         required
//                     ></textarea>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Option</label>
//                     <div className="flex space-x-4 mt-1">
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 value="yes"
//                                 {...register('option')}
//                                 className="mr-2"
//                             />
//                             Yes
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="radio"
//                                 value="no"
//                                 {...register('option')}
//                                 className="mr-2"
//                             />
//                             No
//                         </label>
//                     </div>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Category</label>
//                     <select
//                         {...register('category', { required: true })}
//                         className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                         required
//                     >
//                         <option value="" disabled>Select a category</option>
//                         {categories.map((cat, index) => (
//                             <option key={index} value={cat}>
//                                 {cat}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Select the date</label>
//                     <DateRange
//                         editableDateInputs={true}
//                         onChange={item => setState([item.selection])}
//                         moveRangeOnFirstSelection={false}
//                         ranges={state}
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full py-2 px-4 bg-[#007BFF] text-white font-semibold rounded-lg border-0 hover:bg-green-600"
//                 >
//                     Update Survey
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Update;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";

const Update = () => {
    const survey = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        if (survey) {
            setValue('title', survey.title);
            setValue('description', survey.description);
            setValue('category', survey.category);
            setValue('option', survey.option);
            setState([
                {
                    startDate: new Date(survey.startDate),
                    endDate: new Date(survey.endDate),
                    key: 'selection'
                }
            ]);
        }
    }, [survey, setValue]);

    const onSubmit = async (data) => {
        const updatedSurvey = {
            ...data,
            startDate: state[0].startDate.toISOString(),
            endDate: state[0].endDate.toISOString(),
        };

        try {
            await axiosSecure.put(`/surveys/${survey._id}`, updatedSurvey);
            Swal.fire({
                position: "top",
                icon: "success",
                title: `${survey?.title || 'Survey'} updated successfully`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/dashboard/survey-update");
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const categories = [
        "Employee Engagement Surveys",
        "Customer Satisfaction Surveys",
        "Market Research Surveys",
        "Academic and Educational Surveys",
        "Healthcare Surveys"
    ];

    return (
        <div className="border rounded-xl p-10 mx-auto mt-12 md:mt-20 lg:mt-24">
            <PagesHeader header={'Update Your Survey'}></PagesHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        defaultValue={survey?.title}
                        {...register('title', { required: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        defaultValue={survey?.description}
                        {...register('description', { required: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium">Option</label>
                    <div className="flex space-x-4 mt-1">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="yes"
                                defaultChecked={survey?.option === "yes"}
                                {...register('option')}
                                className="mr-2"
                            />
                            Yes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="no"
                                defaultChecked={survey?.option === "no"}
                                {...register('option')}
                                className="mr-2"
                            />
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select
                        defaultValue={survey?.category}
                        {...register('category', { required: true })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Select the date</label>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setState([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#007BFF] text-white font-semibold rounded-lg border-0 hover:bg-green-600"
                >
                    Update Survey
                </button>
            </form>
        </div>
    );
};

export default Update;

