import { FaHome, FaMoneyBill, FaNewspaper, FaUsers } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {

    const isAdmin = true;
    return (
        <div className="flex">
            <div className="w-[20%] min-h-screen bg-[#007BFF] text-white">
                <h3 className="text-3xl text-center font-bold mt-6">Surveyz</h3>
                {
                    isAdmin && <ul className="md:mt-10 md:pl-8">
                        <li>
                            <NavLink
                                className={"flex gap-2"} to={'/dashboard/admin/users'}>
                                <FaUsers />
                                All Users
                            </NavLink>
                        </li>
                        <li><NavLink
                            className={"flex gap-2"} to={'/dashboard/admin/serveys'}>
                            <FaNewspaper />
                            Surveys</NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={"flex gap-2"} to={'/dashboard/admin/paymentHistoy'}>
                                <FaMoneyBill />
                                Payment History
                            </NavLink>
                        </li>
                    </ul>
                }

                <div className="divider"></div>
                {/* shared navlinks */}
                <ul className="md:mt-10 md:pl-8">
                    <li>
                        <NavLink
                            className={"flex gap-2"} to={'/'}>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={"flex gap-2"} to={'/surveys'}>
                            <FaNewspaper />
                            Surveys
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={"flex gap-2"} to={'/surveyDetails'}>
                            <TbListDetails />
                            Survey Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={"flex gap-2"} to={'/pricing'}>
                            <FaMoneyBill />
                            Pricing
                        </NavLink>
                    </li>
                </ul>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;