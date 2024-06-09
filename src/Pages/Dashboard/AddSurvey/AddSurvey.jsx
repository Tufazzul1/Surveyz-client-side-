import Swal from "sweetalert2";
import SectionTitle from "../../../Components/Sectiontitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import useAuth from "../../../Hooks/useAuth";

const AddSurvey = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const onSubmit = async (data) => {
        console.log(data);
            const surveyData = {
                name: data.title,
                category: data.category,
                description: data.description,
                
            }
            console.log(surveyData)
            const surveyRes = await axiosSecure.post('/surveys', surveyData)
            console.log(surveyRes.data);
            if (surveyRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }


    return (
        <div>
            <SectionTitle title={"Add Survey"}></SectionTitle>
            <div className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F3F3F3] p-6">

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* name */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Title</span>
                            </div>
                            <input type="text"
                                placeholder="Title"
                                {...register('title', { required: true })}
                                className="input w-full" />

                        </label>
                        {/* category */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select defaultValue={'DEFAULT'}  {...register('category', { required: true })} className="select select-bordered w-full">
                                <option disabled value="DEFAULT" >Select a Category</option>
                                <option value="salad">Customer Satisfaction Surveys</option>
                                <option value="pizza">Employee Engagement Surveys</option>
                                <option value="soup">Market Research Surveys</option>
                                <option value="dessert">Academic and Educational Surveys</option>
                                <option value="drinks">Healthcare Surveys</option>

                            </select>
                        </label>

                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* details */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Description</span>
                            </div>
                            <textarea
                                placeholder="Description"
                                {...register('description', { required: true })}
                                className="textarea h-96" />

                        </label>

                        <div>
                            <label>Select the date</label>
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                            />
                        </div>
                    </div>
                    <button className="btn w-full bg-[#007BFF] text-white mt-6">
                        Add Survey
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSurvey;

