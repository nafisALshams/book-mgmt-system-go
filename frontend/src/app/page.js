
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center">
      <nav className="w-full bg-gray-950 py-4 px-8 flex items-center justify-between shadow-lg">
        <div className="text-2xl font-extrabold text-white">Bookstore</div>
        <div className="space-x-6 flex items-center">
          <Link href="/" className="text-white hover:text-blue-400 font-semibold">Home</Link>
          <Link href="/books" className="text-white hover:text-blue-400 font-semibold">Manage Books</Link>
          <Link href="/allbooks" className="text-white hover:text-blue-400 font-semibold">All Books</Link>
        </div>
      </nav>
      <section className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">Welcome to the Bookstore</h1>
          <Link href="/allbooks" className="text-white hover:text-blue-400 font-semibold">All Books</Link>
        <p className="text-xl text-gray-200 mb-8">Manage your books easily with our app.</p>
        <Link href="/books" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition">Go to Book Management</Link>
      </section>
    </main>
  );
}
