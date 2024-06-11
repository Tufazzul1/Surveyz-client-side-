import SectionTitle from "../../../Components/Sectiontitle/SectionTitle";

const Faq = () => {
    return (
        <div className="my-8 px-4 md:px-8">
            <SectionTitle
                title={'Frequently Asked Questions'}
                subTitle={"Here are some common questions from our users."}
            >
            </SectionTitle>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2 h-full">
                    <img src='https://i.ibb.co/g4VK979/faq-small.jpg' alt="" />
                </div>
                <div className="w-full md:w-1/2">
                    <div className="join join-vertical w-full">
                        <div className="collapse collapse-plus join-item border border-base-300">
                            <input type="radio" name="faq-accordion" defaultChecked />
                            <div className="collapse-title text-lg md:text-xl font-medium">
                                What is Surveyz?
                            </div>
                            <div className="collapse-content">
                                <p className="text-sm md:text-base">
                                    Surveyz is a comprehensive tool designed to help you create, distribute, and analyze surveys efficiently. It offers a range of features to simplify the process and provide valuable insights.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border border-base-300">
                            <input type="radio" name="faq-accordion" />
                            <div className="collapse-title text-lg md:text-xl font-medium">
                                How do I create a survey on Surveyz?
                            </div>
                            <div className="collapse-content">
                                <p className="text-sm md:text-base">
                                    Creating a survey is easy. Simply log in to your account, select the "Create Survey" option, choose a template or start from scratch, add your questions, and customize the design to fit your needs.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border border-base-300">
                            <input type="radio" name="faq-accordion" />
                            <div className="collapse-title text-lg md:text-xl font-medium">
                                Can I share my survey with others?
                            </div>
                            <div className="collapse-content">
                                <p className="text-sm md:text-base">
                                    Yes, you can easily share your survey through a link, email, or social media. Surveyz also allows you to embed the survey on your website or blog.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border border-base-300">
                            <input type="radio" name="faq-accordion" />
                            <div className="collapse-title text-lg md:text-xl font-medium">
                                How can I analyze survey responses?
                            </div>
                            <div className="collapse-content">
                                <p className="text-sm md:text-base">
                                    Surveyz provides robust analytics tools to help you interpret your data. You can view real-time results, generate reports, and export data for further analysis.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border border-base-300">
                            <input type="radio" name="faq-accordion" />
                            <div className="collapse-title text-lg md:text-xl font-medium">
                                Is my data secure on Surveyz?
                            </div>
                            <div className="collapse-content">
                                <p className="text-sm md:text-base">
                                    Absolutely. We prioritize data security and ensure that all survey data is encrypted and stored securely. Our platform complies with industry-standard privacy regulations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Faq;
