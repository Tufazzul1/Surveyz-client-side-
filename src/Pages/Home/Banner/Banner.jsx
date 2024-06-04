
const Banner = () => {
    return (

        <div className="hero min-h-screen bg-cover" style={{ backgroundImage: 'url(https://i.ibb.co/NtbtJ3S/Website-surveys-min.jpg)'}}>
            <div className=" bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]  w-full h-full flex items-center">
                <div className="text-white p-6 md:p-12 max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-left">Unlock a Better Experience!</h1>
                    <p className="text-lg md:text-xl mb-6 text-left">Share your thoughts and discover how we can improve things for you.</p>
                    <button className="btn btn-primary text-left">Explore</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;

