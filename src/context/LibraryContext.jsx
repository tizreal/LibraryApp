// LibraryContext.jsx
// Context provides a way to share data across the component tree
// without passing props manually at every level.

import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../api/bookApi";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";

// Step 1: Create the context object
// LibraryContext holds the current value passed to all consumers.
const LibraryContext = createContext(null);

// Step 2: Create the Provider component
// Wrap the whole app with this so every component can access the data.
export function LibraryProvider({ children }) {
  // ── Books state ─────────────────────────────────────────────────────────
  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState(null);

  // ── Users state ─────────────────────────────────────────────────────────
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  // ── Fetch books on mount ─────────────────────────────────────────────────
  useEffect(() => {
    loadBooks();
  }, []); // [] = run once when the app first loads

  useEffect(() => {
    loadUsers();
  }, []);

  // ── Book actions ─────────────────────────────────────────────────────────
  async function loadBooks() {
    try {
      setBooksLoading(true);
      const data = await getAllBooks();
      setBooks(data);
      setBooksError(null);
    } catch (err) {
      setBooksError(err.response?.data?.error || "Failed to load books");
    } finally {
      setBooksLoading(false);
    }
  }

  async function addBook(bookData) {
    const newBook = await createBook(bookData);
    // Append to state — triggers re-render of any component using books
    setBooks((prev) => [...prev, newBook]);
    return newBook;
  }

  async function editBook(id, bookData) {
    const updated = await updateBook(id, bookData);
    // Replace only the updated book in the array — leave all others unchanged
    setBooks((prev) => prev.map((b) => (b.book_id === id ? updated : b)));
    return updated;
  }

  async function removeBook(id) {
    await deleteBook(id);
    // Filter out the deleted book — creates a new array without it
    setBooks((prev) => prev.filter((b) => b.book_id !== id));
  }

  // ── User actions (same pattern) ──────────────────────────────────────────
  async function loadUsers() {
    try {
      setUsersLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setUsersError(null);
    } catch (err) {
      setUsersError(err.response?.data?.error || "Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  }

  async function addUser(userData) {
    const newUser = await createUser(userData);
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  }

  async function editUser(id, userData) {
    const updated = await updateUser(id, userData);
    setUsers((prev) => prev.map((u) => (u.user_id === id ? updated : u)));
    return updated;
  }

  async function removeUser(id) {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.user_id !== id));
  }

  // Step 3: Provide the value to all children
  // Everything in the 'value' object is accessible to any consumer component.
  const value = {
    books,
    booksLoading,
    booksError,
    addBook,
    editBook,
    removeBook,
    loadBooks,
    users,
    usersLoading,
    usersError,
    addUser,
    editUser,
    removeUser,
    loadUsers,
  };

  // MEANING EVERYTHING INSIDE HERE CAN ACCESS LIBRARY DATA
  return (
    <LibraryContext.Provider value={value}> {children}</LibraryContext.Provider>
  );
}

// Step 4: Custom hook — the clean way to consume the context
// Components call useLibrary() instead of useContext(LibraryContext).
// This also gives a clear error if used outside the Provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used inside a <LibraryProvider>");
  }
  return context;
}
