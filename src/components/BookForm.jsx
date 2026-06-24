import { useState } from "react";
import { useLibrary } from "../context/LibraryContext";

const emptyForm = { title: "", author: "", isbn: "", publication_year: "" };

const inputClass =
  "bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#3B82F6] focus:outline-none w-full transition-colors";
const labelClass = "text-sm font-medium text-slate-300";

function BookForm({ initialData = null, onClose }) {
  const [formData, setFormData] = useState(initialData || emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { addBook, editBook } = useLibrary();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (initialData) {
        await editBook(initialData.book_id, formData);
      } else {
        await addBook(formData);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-white">
        {initialData ? "Edit Book" : "Add New Book"}
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Title <span className="text-red-400">*</span>
        </label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Book title"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Author <span className="text-red-400">*</span>
        </label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder="Author name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          ISBN <span className="text-red-400">*</span>
        </label>
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
          placeholder="e.g. 9780451524935"
          className={`${inputClass} font-mono`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Publication Year{" "}
          <span className="text-slate-500 text-xs">(optional)</span>
        </label>
        <input
          name="publication_year"
          value={formData.publication_year}
          onChange={handleChange}
          type="number"
          min="1000"
          max="2100"
          placeholder="e.g. 1949"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Saving..." : initialData ? "Update Book" : "Add Book"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 border border-[#334155] text-slate-400 hover:text-white hover:border-slate-400 rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default BookForm;
