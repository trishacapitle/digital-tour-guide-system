
const DisplaySettings = () => {

  return (
    <div>
      <h2 className="text-white font-bold text-lg">
        <span>Passenger’s Display</span>
      </h2>

      <p className="text-white">
        Lorem ipsum dolor sit amet consectetur. Adipiscing risus nisl volutpat
        natoque lorem dis. Ut varius amet porttitor urna euismod ut. Scelerisque
        mattis amet scelerisque nulla dapibus scelerisque sagittis ut. Vitae diam
        id amet odio.
      </p>

      <div className="flex items-center mt-4">
        <span className="text-white mr-2 font-bold">Switch screen:</span>
        <label className="relative inline-flex cursor-pointer items-center">
          {/* Add switch driver-passenger screen functionality */}
          <input
            type="checkbox"
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-gray-600 rounded-full peer-checked:bg-green-500 transition-all"></div>
          <div className="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>
  );
};
  
  export default DisplaySettings;
  