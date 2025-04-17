const Error = ({message}:any) =>{
    return (
        <div className="flex flex-col items-center justify-center w-full mt-48">
            <img
                src="/assets/Images/error.png"
                alt="Error"
                className="w-40 h-40 mb-4 object-contain"
            />
            <h2 className="text-lg md:text-xl font-semibold text-red-600 text-center">
                {message || "Something went wrong!"}
            </h2>
        </div>
    )
} 
export default Error;