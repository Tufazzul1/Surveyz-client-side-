

const SectionTitle = ({title, subTitle}) => {
    return (
        <div className="text-center flex flex-col items-center w-2/3 mx-auto my-10">
            <h3 className="text-4xl font-bold mb-4 text-gray-500">{title}</h3>
            <p className="text-gray-500">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;