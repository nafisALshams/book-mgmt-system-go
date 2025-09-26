"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col items-center">
      <nav className="w-full bg-gray-950 py-4 px-8 flex justify-between items-center shadow-lg mb-8">
        <div className="text-2xl font-extrabold text-white">Bookstore</div>
        <div className="space-x-6">
          <Link href="/" className="text-white hover:text-blue-400 font-semibold">Home</Link>
          <Link href="/books" className="text-white hover:text-blue-400 font-semibold">Manage Books</Link>
          <Link href="/allbooks" className="text-white hover:text-blue-400 font-semibold">All Books</Link>
        </div>
      </nav>
      <h1 className="text-3xl font-extrabold mb-8 text-white drop-shadow-lg">All Books</h1>
      <button onClick={fetchBooks} className="mb-8 bg-purple-600 text-white rounded px-4 py-2 font-semibold hover:bg-purple-700 transition">Refresh Book List</button>
      <div className="w-full max-w-2xl space-y-6">
        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-400 font-semibold">{error}</p>}
        {books && books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.ID}
              className="transition-transform transform hover:scale-105 border-0 rounded-xl bg-white/90 shadow-lg px-8 py-6 flex flex-col gap-2 relative"
            >
              <div className="text-xl font-bold text-gray-800 mb-1">{book.name}</div>
              <div className="text-base text-gray-700">
                <span className="font-semibold">Author:</span> {book.author}
              </div>
              <div className="text-base text-gray-700">
                <span className="font-semibold">Publication:</span> {book.publication}
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-400">No books found.</p>
        )}
      </div>
    </main>
  );
}
