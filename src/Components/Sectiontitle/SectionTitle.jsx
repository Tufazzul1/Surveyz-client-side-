

const SectionTitle = ({title, subTitle}) => {
    return (
        <div className="text-center flex flex-col items-center w-2/3 mx-auto  py-12">
            <h3 className="text-4xl font-bold mb-4">{title}</h3>
            <p>{subTitle}</p>
        </div>
    );
};

export default SectionTitle;