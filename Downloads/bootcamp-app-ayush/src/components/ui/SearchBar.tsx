interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="flex flex-col items-center mb-12">
            <input
                type="text"
                placeholder="Search for a bootcamp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-700 rounded p-2 w-2/3 md:w-1/3 bg-gray-800 text-gray-300 placeholder-gray-500 outline-none"
            />
        </div>
    );
};

export default SearchBar;
