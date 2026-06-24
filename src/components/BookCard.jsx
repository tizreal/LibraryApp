function BookCard({ book, onDelete, onEdit }) {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col gap-3 hover:border-[#3B82F6]/40 transition-all duration-300 shadow-md w-full">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-white leading-tight">{book.title}</h3>
        <div className="flex gap-2 ml-2 flex-shrink-0">
          <button
            onClick={() => onEdit(book)}
            className="border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg px-3 py-1 text-xs transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book.book_id)}
            className="border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg px-3 py-1 text-xs transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-slate-400 text-sm">by {book.author}</p>

      <div className="flex justify-between items-center pt-2 border-t border-[#334155]">
        <span className="text-xs text-slate-500 font-mono">{book.isbn}</span>
        {book.publication_year && (
          <span className="text-xs text-slate-500">{book.publication_year}</span>
        )}
      </div>
    </div>
  );
}

export default BookCard;
