import SectionTitle from "../Sectiontitle/SectionTitle";


const HowItWorks = () => {
  return (
    <section className="bg-gray-100 p-6">
        <SectionTitle
         title={'How It Works'}
         subTitle={'Discover how easy it is to create, distribute, and analyze surveys with our user-friendly platform. Follow these steps to get started and unlock valuable insights in no time.'}
         >
        </SectionTitle>
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-blue-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1 0V8m0 4h1m-4 4h6m4 0H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up or Log In</h3>
            <p>Create an account or log in if you already have one. Secure your account with a strong password.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-green-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 008 0V5a2 2 0 114 0v10a6 6 0 11-12 0v-4a2 2 0 114 0v4z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create a Survey</h3>
            <p>Click on the Create Survey button on the dashboard. Choose from a variety of question types and customize your survey.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Distribute Your Survey</h3>
            <p>Share your survey via email, social media, or embed it on your website. Use our built-in tools to manage your audience and track responses.</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-yellow-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1 0V8m0 4h1m-4 4h6m4 0H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Add Questions</h3>
            <p>Use our intuitive editor to add questions. Drag and drop to reorder questions and sections. Preview your survey to see how it looks on different devices.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-purple-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm4 4h8m-8 4h8m-8 4h8"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analyze Results</h3>
            <p>View real-time responses and use our analytics tools to interpret the data. Export your data in multiple formats for further analysis.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-teal-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1 0V8m0 4h1m-4 4h6m4 0H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
            <p>Generate detailed reports and gain insights from your survey data. Use the feedback to make informed decisions and improve your strategies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
