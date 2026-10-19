import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ServerStatusBanner from "./components/ServerStatusBanner";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0F172A]">
        <Navbar />
        <ServerStatusBanner />
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
