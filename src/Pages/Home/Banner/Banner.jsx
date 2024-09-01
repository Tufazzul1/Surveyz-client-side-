import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="hero md:min-h-[550px] mb-5">
            <div className="hero-content flex-col lg:flex-row-reverse items-center">
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img src="https://i.ibb.co/CK9NHkf/illustration-02.png" className=" w-full" />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left px-6 lg:px-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-left">We Value Your Feedback!</h1>
                    <p className="text-lg md:text-xl mb-6 text-left">We highly value your feedback as it plays a crucial role in our continuous efforts to enhance our services and provide you with an even better experience.</p>

                    <Link to={'/surveys'}>
                        <button className="btn btn-outline btn-info text-left">Explore</button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Banner;

