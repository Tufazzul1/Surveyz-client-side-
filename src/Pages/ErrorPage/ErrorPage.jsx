import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center'>
            <div className='flex justify-center items-center mt-24'>
                <img className='h-[400px]' src="https://i.ibb.co/2YQQS1v/20824298-6342464.jpg" alt="" />
            </div>
            <Link to={'/'}><button className="btn border hover:text-[#0000ff] border-[#0000ff] bg-[#0000ff] text-white hover:border-[#0000ff]">Go back Home</button></Link>
        </div>
    );
};

export default ErrorPage;