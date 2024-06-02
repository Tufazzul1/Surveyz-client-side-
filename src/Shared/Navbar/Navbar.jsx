import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";



const Navbar = () => {
    const { user, logOut } = useAuth();


    const handleLogOut = () => {
        logOut()
            .then(() => {
                // console.log('Logged out successfully');
            })
            .catch(error => console.log('Error during logout:', error));
    }

    const navoptins = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/menu'}>Our Menu</Link></li>
        <li><Link to={'/order/salad'}>Order Menu</Link></li>
        <li><Link to={'/secret'}>Secret</Link></li>
      
        {
            user ?
                <>
                    <li><button onClick={handleLogOut} className="btn btn-ghost btn-sm">Sign Out</button></li>
                </> : <>
                    <li><Link to={'/login'}>Login</Link></li>
                </>
        }
    </>
    return (
        <div className="navbar z-10 max-w-7xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navoptins}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl uppercase font-cinzel">
                    <div>
                        <p>Surveyz</p>
                    </div>
                </Link>
            </div>
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navoptins}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;