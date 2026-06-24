import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1E293B] border-b border-[#334155]">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          📚 Library<span className="text-[#3B82F6]">App</span>
        </Link>
        <div className="flex gap-1">
          {[
            { path: "/", label: "Home" },
            { path: "/books", label: "Books" },
            { path: "/users", label: "Users" },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`relative px-4 py-2 text-sm transition-colors ${
                isActive(path)
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {label}
              {isActive(path) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6] rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
