import React, { useEffect, useState } from 'react';
import Scroller from "./Scroller";
import Navbar from './Navbar';
import Footer from './Footer';
import { getDocs, collection } from "firebase/firestore";
import { db } from '../firebase';
import Sidebar from './Sidebar';

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogIds, setExpandedBlogIds] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const snapshot = await getDocs(collection(db, "blogs"));
      const blogsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogsData);
    };
    fetchBlogs();
  }, []);

  const toggleContent = (id) => {
    setExpandedBlogIds((prev) =>
      prev.includes(id)
        ? prev.filter((blogId) => blogId !== id)
        : [...prev, id]
    );
  };

  // Filtered blogs based on search input
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#d5d6d8a8] text-[#1A1A1A] p-4 md:p-6 flex flex-col md:flex-row gap-6">
        <Sidebar searchInput={searchInput} onSearch={setSearchInput} />

        <div className="md:w-2/3 w-full">
          <Scroller />
          <div className="my-10 px-2 sm:px-4 md:mt-16">
            <h1 className="text-2xl sm:text-3xl font-bold text-black text-center md:text-left">
              Welcome to THEOARMI Blog
            </h1>
            <p className="text-slate-500 text-md sm:text-lg max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              Dive into inspiring articles, tech insights, and personal stories that inform and engage.
            </p>
          </div>

          {filteredBlogs.length === 0 ? (
            <p className="text-red-500 text-center">No blogs found.</p>
          ) : (
            filteredBlogs.map((blog) => {
              const isExpanded = expandedBlogIds.includes(blog.id);

              return (
                <div
                  key={blog.id}
                  className="p-4 mb-8 rounded-lg shadow-sm flex flex-col gap-6 bg-white"
                >
                  {blog.image && (
                    <div className="w-full max-w-md md:max-w-xl max-h-[285px] overflow-hidden rounded-lg mx-auto">
                      <img
                        src={blog.image}
                        alt="blog"
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 hover:scale-[1.02] transition-transform duration-200 cursor-pointer text-center md:text-left">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2 text-right">{blog.date}</p>
                      <p className="text-[#1A1A1A] leading-relaxed text-sm sm:text-base text-justify">
                        {isExpanded ? blog.content : `${blog.content.slice(0, 200)}...`}
                      </p>
                    </div>

                    <button
                      className="ml-auto text-[#1A1A1A] w-auto min-w-[80px] px-4 py-2 mt-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition"
                      onClick={() => toggleContent(blog.id)}
                    >
                      {isExpanded ? 'Hide' : 'Read More'}
                    </button>
                  </div>
                </div>

              );
            })
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
