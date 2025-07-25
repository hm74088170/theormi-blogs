import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import Navbar from './Navbar';

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', image: '' });

  const blogRef = collection(db, 'blogs');

  const fetchBlogs = async () => {
    const snapshot = await getDocs(blogRef);
    const blogsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBlogs(blogsData);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.content) return alert("Fields are empty");
    await addDoc(blogRef, {
      ...form,
      date: new Date().toLocaleDateString()
    });
    setForm({ title: '', content: '', image: '' });
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'blogs', id));
    fetchBlogs();
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, 'blogs', id), {
      ...form
    });
    setForm({ title: '', content: '', image: '' });
    fetchBlogs();
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* Create/Edit Form */}
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 w mb-2 w-80"
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="border p-2 block mb-2 w-80"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="border p-2 block mb-2 w-80"
      />
      <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 rounded">Create Blog</button>

      {/* Blog List */}
      <h3 className="text-xl font-semibold mt-6">All Blogs</h3>
      {blogs.map((blog) => (
        <div key={blog.id} className="border p-4 mt-4 rounded  w-[600px]">
          <h4 className="font-bold">{blog.title}</h4>
          <p>{blog.content.slice(0, 100)}...</p>
          <p className="text-sm">{blog.date}</p>
          <button
            onClick={() => handleDelete(blog.id)}
            className="text-red-500 mr-2"
          >
            Delete
          </button>
          <button
            onClick={() => handleUpdate(blog.id)}
            className="text-blue-500"
          >
            Update
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default AdminPage;
