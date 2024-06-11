import { Helmet } from "react-helmet";
import HowItWorks from "../../../Components/HowItWorks/HowItWorks";
import Footer from "../../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import Faq from "../FAQ/FAQ";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Surveyz</title>
            </Helmet>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Faq></Faq>
        </div>
    );
};

export default Home;