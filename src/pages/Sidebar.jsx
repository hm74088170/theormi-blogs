import React, { useEffect, useState } from "react";

const Sidebar = ({ searchInput, onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const AnimatedParagraph = () => {
    const words = [
      "EVIDENCE",
      "PRINCIPLES",
      "FORMULAS",
      "CONCEPTS",
      "ANALYSIS",
      "INSIGHT",
      "THEORIES",
      "MODELS",
      "RESEARCH",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 2500);

      return () => clearInterval(interval);
    }, []);

    return (
      <p className="text-md font-bold text-xl text-black text-left mb-4 transition-all duration-500 ease-in-out">
        Every blog explores a complex topic through scientific{" "}
        <span className="text-blue-800 animate-fade-in">
          {words[index]}...
        </span>
      </p>
    );
  };

  const keywords = ["Physics", "Travel", "Technology", "Social", "Lifestyle", "Inventions"];

  return (
    <div className="w-full md:w-1/3 h-[300px] md:h-[700px] bg-[#e5eaf5f8] md:sticky md:top-[80px] pb-3 p-4">
      <AnimatedParagraph />

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
