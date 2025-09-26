"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", author: "", publication: "" });
  const [updateForm, setUpdateForm] = useState({ id: "", name: "", author: "", publication: "" });
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const fetchBooks = () => {
    setLoading(true);
    setError("");
    fetch("http://localhost:9010/book/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Create Book
  const handleCreate = (e) => {
    e.preventDefault();
    fetch("http://localhost:9010/book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create book");
        setForm({ name: "", author: "", publication: "" });
        fetchBooks();
      })
      .catch((err) => setError(err.message));
  };

  // Delete Book
  const handleDelete = (id) => {
    fetch(`http://localhost:9010/book/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete book");
        fetchBooks();
      })
      .catch((err) => setError(err.message));
  };

  // Update Book
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9010/book/${updateForm.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updateForm.name,
        author: updateForm.author,
        publication: updateForm.publication,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update book");
        setUpdateForm({ id: "", name: "", author: "", publication: "" });
        fetchBooks();
      })
      .catch((err) => setError(err.message));
  };

  // Get Book by ID
  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9010/book/${searchId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Book not found");
        return res.json();
      })
      .then((data) => setSearchResult(data))
      .catch((err) => setSearchResult({ error: err.message }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col items-center">
       <nav className="w-full bg-gray-950 py-4 px-8 flex items-center justify-between shadow-lg mb-8">
         <div className="text-2xl font-extrabold text-white">Bookstore</div>
         <div className="space-x-6 flex items-center">
           <Link href="/" className="text-white hover:text-blue-400 font-semibold">Home</Link>
           <Link href="/books" className="text-white hover:text-blue-400 font-semibold">Manage Books</Link>
           <Link href="/allbooks" className="text-white hover:text-blue-400 font-semibold">All Books</Link>
         </div>
       </nav>

  <h1 className="text-3xl font-extrabold mb-8 text-white drop-shadow-lg">Manage Books</h1>

      {/* Create Book Form */}
      <form onSubmit={handleCreate} className="bg-white/90 rounded-xl shadow-lg px-8 py-6 mb-8 w-full max-w-2xl flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Add a New Book</h2>
        <label className="font-semibold text-gray-700">Book Name
          <input className="mt-1 p-3 rounded border border-gray-400 w-full text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" required placeholder="Book Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="font-semibold text-gray-700">Author
          <input className="mt-1 p-3 rounded border border-gray-400 w-full text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" required placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
        </label>
        <label className="font-semibold text-gray-700">Publication
          <input className="mt-1 p-3 rounded border border-gray-400 w-full text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" required placeholder="Publication" value={form.publication} onChange={e => setForm({ ...form, publication: e.target.value })} />
        </label>
        <button className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Add Book</button>
      </form>

      {/* Update Book Form */}
      <form onSubmit={handleUpdate} className="bg-white/90 rounded-xl shadow-lg px-8 py-6 mb-8 w-full max-w-2xl flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Update Book</h2>
        <label className="font-semibold text-gray-700">Book ID
          <input className="mt-1 p-3 rounded border border-gray-400 w-full text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400" required placeholder="Book ID" value={updateForm.id} onChange={e => setUpdateForm({ ...updateForm, id: e.target.value })} />
        </label>
        <label className="font-semibold text-gray-700">Book Name
          <input className="mt-1 p-3 rounded border border-gray-400 w-full text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400" required placeholder="Book Name" value={updateForm.name} onChange={e => setUpdateForm({ ...updateForm, name: e.target.value })} />
        </label>
        <label className="font-semibold text-gray-700">Author
          <input className="mt-1 p-3 rounded border border-gray-400 w-full text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400" required placeholder="Author" value={updateForm.author} onChange={e => setUpdateForm({ ...updateForm, author: e.target.value })} />
        </label>
        <label className="font-semibold text-gray-700">Publication
          <input className="mt-1 p-3 rounded border border-gray-400 w-full text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400" required placeholder="Publication" value={updateForm.publication} onChange={e => setUpdateForm({ ...updateForm, publication: e.target.value })} />
        </label>
        <button className="bg-yellow-600 text-white rounded px-4 py-2 font-semibold hover:bg-yellow-700 transition">Update Book</button>
      </form>

      {/* Get Book by ID */}
      <form onSubmit={handleSearch} className="bg-white/90 rounded-xl shadow-lg px-8 py-6 mb-8 w-full max-w-2xl flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Get Book by ID</h2>
        <label className="font-semibold text-gray-700">Book ID
          <input className="mt-1 p-3 rounded border border-gray-400 w-full text-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-400" required placeholder="Book ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
        </label>
        <button className="bg-green-600 text-white rounded px-4 py-2 font-semibold hover:bg-green-700 transition">Get Book</button>
        {searchResult && (
          searchResult.error ? (
            <p className="text-red-500">{searchResult.error}</p>
          ) : (
            <div className="mt-2 p-4 bg-white rounded shadow text-gray-900">
              <div className="font-bold text-lg">{searchResult.name}</div>
              <div><span className="font-semibold">Author:</span> {searchResult.author}</div>
              <div><span className="font-semibold">Publication:</span> {searchResult.publication}</div>
            </div>
          )
        )}
      </form>


        {/* Book list and refresh button moved to /allbooks page */}
    </main>
  );
}
