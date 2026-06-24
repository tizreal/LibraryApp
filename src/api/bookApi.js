// bookApi.js — API calls for /api/books
// Each function matches one backend endpoint.
// Components call these functions; they never call axiosClient directly.

import axiosClient from "./axiosClient";

// GET /api/books — fetch all books
export const getAllBooks = async () => {
  const response = await axiosClient.get("/api/books");
  const data = response.data;
  return Array.isArray(data) ? data : (data.content ?? data.books ?? []); // response.data is the parsed JSON array
};

// GET /api/books/:id — fetch one book by ID
export const getBookById = async (id) => {
  const response = await axiosClient.get(`/api/books/${id}`);
  return response.data;
};

// POST /api/books — create a new book
// bookData is an object: { title, author, isbn, publication_year }
export const createBook = async (bookData) => {
  const payload = {
    title: bookData.title,
    author: bookData.author,
    isbn: bookData.isbn,
    publication_year: bookData.publication_year
      ? parseInt(bookData.publication_year, 10)
      : null,
  };
  const response = await axiosClient.post("/api/books", payload);
  return response.data; // The created book object with book_id
};

// PUT /api/books/:id — update an existing book
export const updateBook = async (id, bookData) => {
  const response = await axiosClient.put(`/api/books/${id}`, bookData);
  return response.data;
};

// DELETE /api/books/:id — delete a book
// Returns nothing (204 No Content from the server)
export const deleteBook = async (id) => {
  await axiosClient.delete(`/api/books/${parseInt(id, 10)}`);
};
