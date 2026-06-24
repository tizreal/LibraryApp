import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";

function BooksPage() {
  const { books, booksLoading, booksError, removeBook, loadBooks } = useLibrary();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  function openAddForm() {
    setEditingBook(null);
    setShowForm(true);
  }

  function openEditForm(book) {
    setEditingBook(book);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingBook(null);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this book?")) return;
    try {
      await removeBook(id);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete book");
    }
  }

  if (booksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-10 h-10 border-4 border-[#3B82F6] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (booksError) {
    return (
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 text-center">
        <p className="text-red-400 font-medium">{booksError}</p>
        <button
          onClick={loadBooks}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-white">Books</h1>
          <p className="text-slate-400 text-sm">
            {books.length} book{books.length !== 1 ? "s" : ""} in library
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-full px-5 py-2 text-sm font-medium transition-colors"
        >
          + Add Book
        </button>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-lg font-medium text-slate-400">No books yet</p>
          <p className="text-sm">Click '+ Add Book' to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {books.map((book) => (
            <BookCard
              key={book.book_id}
              book={book}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeForm}
        >
          <div
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <BookForm initialData={editingBook} onClose={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksPage;
