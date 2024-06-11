import { Helmet } from "react-helmet";
import PagesHeader from "../../Components/PagesHeader/PagesHeader";
import { Link } from "react-router-dom";

const Pricing = () => {
    return (
        <div>
            <Helmet>
                <title>Pricing | Surveyz</title>
            </Helmet>
            <PagesHeader header={'Pricing'}></PagesHeader>
            <div className="card bg-blue-500 text-white mx-auto max-w-md mt-12 rounded-lg shadow-lg">
                <div className="card-body p-6">
                    <h2 className="card-title text-2xl font-bold">Pro Membership</h2>
                    <p className="mt-4">
                        Get access to exclusive features and comment on any survey.
                    </p>
                    <p className="mt-2">
                        <strong>$9.99/month</strong>
                    </p>
                    <div className="card-actions justify-end mt-6">
                        <Link to={'/payments'}>
                            <button
                                className="btn bg-white text-blue-500 hover:bg-gray-200 py-2 px-4 rounded"
                            >
                                Buy Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
