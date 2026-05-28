import { useEffect, useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [stock, setStock] = useState("");
  const [idCategory, setIdCategory] = useState("");

  const [editId, setEditId] = useState(null);

  // FETCH BOOKS
  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");

      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setPublisher("");
    setPublicationYear("");
    setStock("");
    setIdCategory("");

    setEditId(null);
  };

  // ADD BOOK
  const addBook = async (e) => {
    e.preventDefault();

    try {
      await api.post("/books", {
        title,
        author,
        publisher,
        publication_year: publicationYear,
        stock,
        id_category: idCategory,
      });

      resetForm();

      fetchBooks();

      Swal.fire({
        title: "Success!",
        text: "Book added successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // EDIT MODE
  const editBook = (book) => {
    setEditId(book.id_book);

    setTitle(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
    setPublicationYear(book.publication_year);
    setStock(book.stock);
    setIdCategory(book.id_category);
  };

  // UPDATE BOOK
  const updateBook = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/books/${editId}`, {
        title,
        author,
        publisher,
        publication_year: publicationYear,
        stock,
        id_category: idCategory,
      });

      resetForm();

      fetchBooks();

      Swal.fire({
        title: "Updated!",
        text: "Book updated successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE BOOK
  const deleteBook = async (id) => {
    const result = await Swal.fire({
      title: "Delete Book?",
      text: "This data will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/books/${id}`);

      fetchBooks();

      Swal.fire({
        title: "Deleted!",
        text: "Book deleted successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Books</h1>

      {/* FORM */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <form
          onSubmit={editId ? updateBook : addBook}
          className="grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="number"
            placeholder="Publication Year"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <select
            value={idCategory}
            onChange={(e) => setIdCategory(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id_category} value={category.id_category}>
                {category.category_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800"
          >
            {editId ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow p-5 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Author</th>
              <th className="text-left p-3">Publisher</th>
              <th className="text-left p-3">Year</th>
              <th className="text-left p-3">Stock</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id_book} className="border-b hover:bg-gray-50">
                <td className="p-3">{book.id_book}</td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.publisher}</td>
                <td className="p-3">{book.publication_year}</td>
                <td className="p-3">{book.stock}</td>
                <td className="p-3">{book.category_name}</td>

                <td className="p-3">
                  <button
                    onClick={() => editBook(book)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBook(book.id_book)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
