import Link from "next/link";
import { FaClock } from "react-icons/fa";

interface BootcampCardProps {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

const BootcampCard: React.FC<BootcampCardProps> = ({ id, title, description, createdAt }) => {
    const truncateDescription = (text: string, length = 100) =>
        text.length > length ? `${text.substring(0, length)}...` : text;

    return (
        <div className="bg-white border border-gray-200 relative rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50">
            <div className="p-5">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    <Link 
                        href={`/explore/${id}`} 
                        className="hover:text-gray-700 transition-colors"
                    >
                        {title}
                    </Link>
                </h3>
                <p className="text-gray-600 mb-4 text-m leading-relaxed">
                    {truncateDescription(description)}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                        <FaClock className="mr-2 text-gray-400" />
                        {new Date(createdAt).toLocaleDateString()}
                    </div>
                </div>
                <Link href={`/explore/${id}`}>
                    <button className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-900 transition-colors font-medium text-m">
                        Explore Curriculum
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BootcampCard;