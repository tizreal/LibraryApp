import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import UsersPage from "./pages/UsersPage";
import axiosClient from "./api/axiosClient";

function App() {
  useEffect(() => {
    axiosClient.get("/").catch(() => {}); // Silent wake-up ping
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0F172A]">
        <Navbar />
        <main className="max-w-6xl mx-auto px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route
              path="*"
              element={
                <p className="text-center mt-20 text-slate-500">Page not found</p>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
