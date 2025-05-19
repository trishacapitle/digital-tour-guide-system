const Loader = ({ message }) => {
    return (
      <div className="fixed w-[1024px] h-[600px] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" style={{ animation: "fadeIn 0.5s ease-in-out" }}>
        <div className="rounded-lg shadow-lg text-center">
          <p className="font-bold text-2xl text-white" style={{ animation: "pulseText 1.5s infinite ease-in-out" }}>{message}</p>
        </div>
      </div>
    );
  };
  
  export default Loader;
  