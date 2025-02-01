interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search for a bootcamp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 text-slate-950 rounded-lg px-3 py-1 outline-none"
            />
        </div>
    );
};

export default SearchBar;
