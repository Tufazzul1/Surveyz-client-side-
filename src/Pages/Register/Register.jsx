import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";


const Register = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        console.log(name, email, photo, password);

        if (password.length < 6) {
            Swal.fire({
                title: 'Error!',
                text: "Password should be atleast 6 character",
                icon: 'error',
                confirmButtonText: 'ok'
            });
            return
        }
        else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                title: 'Error!',
                text: "Password must contain at least one uppercase letter",
                icon: 'error',
                confirmButtonText: 'ok'
            });
            return;
        }
        else if (!/[a-z]/.test(password)) {
            Swal.fire({
                title: 'Error!',
                text: "Password must contain at least one lowwercase letter",
                icon: 'error',
                confirmButtonText: 'ok'
            });
            return;
        }
        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                updateUserProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                            photo: photo,
                            role: 'user'
                        }
                        axiosPublic.put('/users', userInfo)
                            .then(res => {
                                if (res.data) {
                                    console.log('user added to the database')
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    
                                }
                                navigate("/");
                            })


                    })
                    .catch((error) => {
                        console.error("Profile update failed:", error);

                    });
            })
            .catch((error) => {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Invalid email or password",
                    icon: "error",
                    confirmButtonText: "ok",
                });
            });
    }

    const handleSocialLogin = () => {

        signInWithGoogle()
            .then(result => {
                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    photo: result?.user?.photoURL,
                    role: 'user',
                }
                axiosPublic.put('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Login successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // navigate 
                        navigate(location?.state ? location.state : '/');
                    })
                console.log(result.user);

            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid email or password',
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
            }
            )
    }
    return (
        
        <div>
            <Helmet>
                <title>Register | Surveyz</title>
            </Helmet>
            <div className="flex justify-center items-center pt-24">
            <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
                <h2 className="mb-3 text-3xl font-semibold text-center">Sign up here</h2>
                <p className="text-sm text-center dark:text-gray-600">Already have an account?
                    <Link to={'/login'} href="#" rel="noopener noreferrer" className="focus:underline hover:underline text-blue-500 ml-2">Log in</Link>
                </p>
                <div className="my-6 space-y-4">
                    <button onClick={handleSocialLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                    </button>

                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full dark:text-gray-600" />
                    <p className="px-3 dark:text-gray-600">OR</p>
                    <hr className="w-full dark:text-gray-600" />
                </div>
                <form onSubmit={handleRegister} className="space-y-8 relative">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Name</label>
                            <input type="text" name="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Email address</label>
                            <input type="email" name="email" placeholder="example@gmail.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm">Photo URL</label>
                            <input type="text" name="photo" placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        </div>
                        <div className="space-y-2 relative">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
                            </div>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50" type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Register;