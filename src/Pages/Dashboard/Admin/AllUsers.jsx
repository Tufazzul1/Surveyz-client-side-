import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PagesHeader from "../../../Components/PagesHeader/PagesHeader";
import { useState } from "react";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [filter, setFilter] = useState('all');
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    });


    const handleChangeRole = (user, newRole) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a ${newRole}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure want to delelte this user?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    const filteredUsers = filter === 'all' ? users : users.filter(user => user.role === filter);

    return (
        <div>
            <Helmet>
                <title>Users | Dashboard</title>
            </Helmet>
            <PagesHeader
                header={'All Users'}
            ></PagesHeader>
            <div className="flex justify-center my-4">
                <div className="text-center">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="btn btn-outline btn-info btn-sm">
                        <option value="all">All</option>
                        <option value="admin">Admins</option>
                        <option value="surveyor">Surveyors</option>
                        <option value="pro-user">Pro-Users</option>
                        <option value="user">Users</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto p-4 md:p-10">
                <table className="table table-zebra">

                    <thead className="text-white bg-[#007BFF] rounded-t-xl">
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Edit Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.photo} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td> <div className="badge bg-[#007BFFaf]">{user?.role}</div></td>
                                <td>
                                    <select
                                        onChange={(e) => handleChangeRole(user, e.target.value)}
                                        defaultValue={user?.role || 'Change Role'}
                                    >
                                        <option value="Change Role" disabled>Change Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="surveyor">Surveyor</option>
                                        <option value="pro-user">Pro-User</option>
                                        <option value="user">User</option>
                                    </select>
                                </td>

                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn bg-red-500 p-2 text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;