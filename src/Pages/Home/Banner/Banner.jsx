
const Banner = () => {
    return (

        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/NtbtJ3S/Website-surveys-min.jpg)' }}>
            <div className="bg-black bg-opacity-10 w-full h-full flex items-center">
                <div className="text-white p-6 md:p-12 max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-left">We Value Your Feedback!</h1>
                    <p className="text-lg md:text-xl mb-6 text-left">Take our quick survey and help us improve your experience.</p>
                    <button className="btn btn-primary text-left">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;

