"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";
import Button from "@/components/Button";

export default function AllBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showMessage = (message, type = "success") => {
    if (type === "success") {
      setSuccess(message);
      setError("");
    } else {
      setError(message);
      setSuccess("");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  const fetchBooks = () => {
    setLoading(true);
    setError("");
    fetch("http://localhost:9010/book/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch books");
        return res.json();
      })
      .then((data) => {
        setBooks(data || []);
        setLoading(false);
      })
      .catch((err) => {
        showMessage(err.message, "error");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    
    fetch(`http://localhost:9010/book/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete book");
        showMessage("Book deleted successfully!");
        fetchBooks();
      })
      .catch((err) => showMessage(err.message, "error"));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Book Library
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Browse through your complete collection of books
          </p>
          
          <Button
            onClick={fetchBooks}
            disabled={loading}
            variant="secondary"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
          >
            {loading ? "Refreshing..." : "Refresh Library"}
          </Button>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="mb-8 bg-green-500/20 border border-green-500/30 text-green-300 px-6 py-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {success}
            </div>
          </div>
        )}
        
        {error && (
          <div className="mb-8 bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
          </div>
        )}

        {/* Books Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books && books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book.ID}
                  book={book}
                  onDelete={handleDelete}
                  showActions={true}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No Books Found</h3>
                <p className="text-gray-500 mb-6">Your library is empty. Start by adding some books!</p>
                <Button
                  onClick={() => window.location.href = '/books'}
                  variant="primary"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Add Your First Book
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {!loading && books && books.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 inline-block">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{books.length}</div>
                  <div className="text-gray-400">Total Books</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {new Set(books.map(book => book.author || book.Author)).size}
                  </div>
                  <div className="text-gray-400">Authors</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {new Set(books.map(book => book.publication || book.Publication)).size}
                  </div>
                  <div className="text-gray-400">Publishers</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}