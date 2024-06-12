import { Helmet } from "react-helmet";
import HowItWorks from "../../../Components/HowItWorks/HowItWorks";
import Banner from "../Banner/Banner";
import Faq from "../FAQ/FAQ";
import LatestSurveys from "../LatestSurveys/LatesSurveys";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Surveyz</title>
            </Helmet>
            <Banner></Banner>
            <LatestSurveys></LatestSurveys>
            <HowItWorks></HowItWorks>
            <Faq></Faq>
        </div>
    );
};

export default Home;