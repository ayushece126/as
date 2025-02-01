// src/components/ui/Loader.tsx
import MoonLoader from "react-spinners/MoonLoader"

const Loader = () => {
    return (
        <div className="flex justify-center items-center">
            <MoonLoader size={30} color="#4299e1" />
        </div>
    );
};

export default Loader;