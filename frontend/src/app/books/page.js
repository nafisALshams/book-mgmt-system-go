"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import FormCard from "@/components/FormCard";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ name: "", author: "", publication: "" });
  const [updateForm, setUpdateForm] = useState({ id: "", name: "", author: "", publication: "" });
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

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

  useEffect(() => {
    fetchBooks();
  }, []);

  // Create Book
  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:9010/book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create book");
        setForm({ name: "", author: "", publication: "" });
        showMessage("Book added successfully!");
        fetchBooks();
      })
      .catch((err) => showMessage(err.message, "error"))
      .finally(() => setLoading(false));
  };

  // Update Book
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
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
        showMessage("Book updated successfully!");
        fetchBooks();
      })
      .catch((err) => showMessage(err.message, "error"))
      .finally(() => setLoading(false));
  };

  // Get Book by ID
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`http://localhost:9010/book/${searchId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Book not found");
        return res.json();
      })
      .then((data) => {
        setSearchResult(data);
        showMessage("Book found!");
      })
      .catch((err) => {
        setSearchResult({ error: err.message });
        showMessage(err.message, "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Manage Your Books
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Add new books, update existing ones, and search through your collection
          </p>
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Book Form */}
          <FormCard 
            title="Add New Book"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            <form onSubmit={handleCreate} className="space-y-6">
              <Input
                label="Book Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter book title"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
              />
              
              <Input
                label="Author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Enter author name"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              
              <Input
                label="Publication"
                value={form.publication}
                onChange={(e) => setForm({ ...form, publication: e.target.value })}
                placeholder="Enter publisher name"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              />
              
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                className="w-full"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                {loading ? "Adding..." : "Add Book"}
              </Button>
            </form>
          </FormCard>

          {/* Update Book Form */}
          <FormCard 
            title="Update Book"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          >
            <form onSubmit={handleUpdate} className="space-y-6">
              <Input
                label="Book ID"
                value={updateForm.id}
                onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
                placeholder="Enter book ID"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                }
              />
              
              <Input
                label="Book Name"
                value={updateForm.name}
                onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
                placeholder="Enter new book title"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
              />
              
              <Input
                label="Author"
                value={updateForm.author}
                onChange={(e) => setUpdateForm({ ...updateForm, author: e.target.value })}
                placeholder="Enter new author name"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              
              <Input
                label="Publication"
                value={updateForm.publication}
                onChange={(e) => setUpdateForm({ ...updateForm, publication: e.target.value })}
                placeholder="Enter new publisher name"
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              />
              
              <Button
                type="submit"
                disabled={loading}
                variant="warning"
                className="w-full"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              >
                {loading ? "Updating..." : "Update Book"}
              </Button>
            </form>
          </FormCard>
        </div>

        {/* Search Book Section */}
        <div className="mt-12">
          <FormCard 
            title="Search Book by ID"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          >
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    label="Book ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter book ID to search"
                    required
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="success"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  >
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
              
              {searchResult && (
                <div className="mt-6">
                  {searchResult.error ? (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {searchResult.error}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Book Found:</h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span className="font-semibold">Title:</span>
                          <span className="ml-2 text-white">{searchResult.name || searchResult.Name}</span>
                        </p>
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="font-semibold">Author:</span>
                          <span className="ml-2 text-white">{searchResult.author || searchResult.Author}</span>
                        </p>
                        <p className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-semibold">Publisher:</span>
                          <span className="ml-2 text-white">{searchResult.publication || searchResult.Publication}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
          </FormCard>
        </div>
      </div>
    </div>
  );
}