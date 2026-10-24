import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

export default function HomePage() {
  const { books, users, booksLoading, usersLoading } = useLibrary();

  const stats = [
    { label: "Total Books", value: booksLoading ? "—" : books.length, icon: "📚" },
    { label: "Total Users", value: usersLoading ? "—" : users.length, icon: "👥" },
    {
      label: "Total Entries",
      value: booksLoading || usersLoading ? "—" : books.length + users.length,
      icon: "📋",
    },
  ];

  return (
    <div className="py-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">Library Management System</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Manage your collection of books and library members from one place.
        </p>
        <p className="text-slate-300 text-sm max-w-xl mx-auto rounded-xl border border-[#334155] bg-[#1E293B]/60 px-4 py-3">
          Demo environment with fictional sample data. Changes are temporary and reset
          automatically: this is a shared sandbox that resets on startup and every 6 hours.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/books"
            className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-medium transition-colors"
          >
            View Books
          </Link>
          <Link
            to="/users"
            className="px-6 py-3 border border-[#334155] hover:border-[#3B82F6]/60 text-white rounded-xl font-medium transition-colors"
          >
            View Users
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-16">
        {stats.map(({ label, value, icon }) => (
          <div
            key={label}
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 text-center shadow-md w-full"
          >
            <p className="text-3xl mb-2">{icon}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-slate-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
