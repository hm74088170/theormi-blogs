
const Sidebar = ({ searchInput, onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const keywords = ['Physics', 'Travel', 'Technology', 'Social', 'Lifestyle', 'Inventions'];

  return (
    <div className="w-full md:w-1/3 h-[300px] md:h-[700px] bg-[#e5eaf5f8] md:sticky md:top-[80px] p-4">
        <p className ="font-bold mb-4 ">"From code to creativity, this blog decodes the digital world. Whether you're into dev tips, tech reviews, or brainy rants — scroll on, we’ve got bytes for every brain."</p>
      <h2 className="font-semibold mb-2">Filter by Tag:</h2>
      <ul className="flex flex-wrap gap-2 mb-4">
        {keywords.map((word, index) => (
          <li
            key={index}
            className="cursor-pointer bg-white border border-gray-300 rounded px-3 py-1 text-sm hover:bg-blue-100 transition"
            onClick={() => onSearch(word)}
          >
            {word}
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
        placeholder="Search blogs..."
        className="w-full my-5 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
};

export default Sidebar;
