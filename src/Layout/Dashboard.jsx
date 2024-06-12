import { FaHome, FaMoneyBill, FaNewspaper, FaUsers } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useSurveyor from "../Hooks/useSurveyor";
import { MdUpdate } from "react-icons/md";
import useProUser from "../Hooks/useProUser";
import useUser from "../Hooks/useUser";


const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    const [isProUser] = useProUser();
    const [isUser] = useUser();
    return (
        <div className="flex">
            <div className="w-[20%] min-h-screen bg-[#007BFF] text-white">
                <Link to={'/'} className="text-3xl flex justify-center font-bold mt-6">Surveyz</Link>
                <div>
                    {/* admin */}
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
                                    className={"flex gap-2"} to={'/dashboard/admin/viewPayments'}>
                                    <FaMoneyBill />
                                   View Payments 
                                </NavLink>
                            </li>
                        </ul>
                    }
                    {/* surveyor */}
                    {
                        isSurveyor && 
                        <ul className="md:mt-10 md:pl-8">
                            <li>
                                <NavLink
                                    className={"flex gap-2"} to={'/dashboard/surveyor/addSurvey'}>
                                    <FaNewspaper />
                                    Add Survey
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={"flex gap-2"} to={'/dashboard/surveyor/updateSurveys'}>
                                    <MdUpdate />
                                    Update Survey
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={"flex gap-2"} to={'/dashboard/surveyor/surveyorDetails'}>
                                    <TbListDetails />
                                     Surveyor Details
                                </NavLink>
                            </li>
                        </ul>
                    }
                    {/*pro - normal user  */}
                    {
                        isProUser && 
                        <ul className="md:mt-10 md:pl-8">
                            <li>
                                <NavLink
                                    className={"flex gap-2"} to={'/dashboard/user/serveys'}>
                                    <FaNewspaper />
                                    Participated surveys    
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={"flex gap-2"} to={'/dashboard/user/reported'}>
                                    <FaUsers />
                                    Reported surveys    
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={"flex gap-2"} to={'/dashboard/user/commented'}>
                                    <FaUsers />
                                    Commented surveys    
                                </NavLink>
                            </li>
                        </ul>
                    }
                    
                    {
                        isUser  && 
                        <ul className="md:mt-10 md:pl-8">
                             <li>
                                <NavLink
                                    className={"flex gap-2"} to={'/dashboard/user/serveys'}>
                                    <FaNewspaper />
                                    Participated surveys    
                                </NavLink>
                            </li>
                             <li>
                                <NavLink
                                    className={"flex gap-2"} to={'/dashboard/user/reported'}>
                                    <FaNewspaper />
                                    Reported surveys    
                                </NavLink>
                            </li>
                        </ul>
                    }
                </div>

                <div className="divider"></div>
                {/* shared navlinks */}
                <div>
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
                                className={"flex gap-2"} to={'/pricing'}>
                                <FaMoneyBill />
                                Pricing
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;