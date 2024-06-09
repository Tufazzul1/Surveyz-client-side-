

const PagesHeader = ({header}) => {
    return (
        <div className="bg-[url('https://i.ibb.co/h2jzkW9/2147843218.jpg')] bg-cover bg-center bg-no-repeat h-[200px] md:h-[300px] flex justify-center items-center">
            <h3 className="text-xl md:text-4xl font-bold">{header}</h3>
        </div>
    );
};

export default PagesHeader;
