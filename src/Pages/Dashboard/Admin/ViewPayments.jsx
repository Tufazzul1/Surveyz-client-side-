import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";

const ViewPayments = () => {
    const axiosPublic = useAxiosPublic();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axiosPublic.get('/payments')
            .then(res => {
                console.log(res.data);
                setPayments(res.data);
            })
            .catch(error => {
                console.error("Error fetching payments:", error);
            });
    }, [axiosPublic]);

    return (
        <div>
            <PagesHeader header={'Payments History'}></PagesHeader>
            <div className="overflow-x-auto p-4 md:p-10">
                <table className="table table-zebra">

                    <thead className="text-white bg-[#007BFF] rounded-t-xl">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Transaction id</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment?.name}</td>
                                <td>{payment?.email}</td>
                                <td>{payment?.transactionId}</td>
                                <td>{payment?.date}</td>
                               
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPayments;
