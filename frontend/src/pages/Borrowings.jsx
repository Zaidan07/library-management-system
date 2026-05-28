import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import { dummyBorrowings, dummyMembers, dummyBooks } from "../data/dummyData";

const Borrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

  const [idMember, setIdMember] = useState("");
  const [idBook, setIdBook] = useState("");
  const [borrowingDate, setBorrowingDate] = useState("");
  const [returnDeadline, setReturnDeadline] = useState("");

  const fetchBorrowings = async () => {
    try {
      const response = await api.get("/borrowings");

      setBorrowings(response.data);
    } catch {
      console.warn("Backend not running. Using dummy borrowings data.");

      setBorrowings(dummyBorrowings);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await api.get("/members");

      setMembers(response.data);
    } catch {
      console.warn("Backend not running. Using dummy members data.");

      setMembers(dummyMembers);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");

      setBooks(response.data);
    } catch {
      console.warn("Backend not running. Using dummy books data.");

      setBooks(dummyBooks);
    }
  };

  const resetForm = () => {
    setIdMember("");
    setIdBook("");
    setBorrowingDate("");
    setReturnDeadline("");
  };

  const addBorrowing = async (e) => {
    e.preventDefault();

    try {
      await api.post("/borrowings", {
        id_member: idMember,
        id_book: idBook,
        borrowing_date: borrowingDate,
        return_deadline: returnDeadline,
      });

      resetForm();

      fetchBorrowings();
      fetchBooks();

      Swal.fire({
        title: "Success!",
        text: "Borrowing data added successfully.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: error.response?.data?.message || "Failed to add borrowing data.",
        icon: "error",
      });
    }
  };

  const returnBook = async (id) => {
    const result = await Swal.fire({
      title: "Return this book?",
      text: "The book status will be changed to returned.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Return",
    });

    if (!result.isConfirmed) return;

    try {
      await api.put(`/borrowings/${id}/return`);

      fetchBorrowings();
      fetchBooks();

      Swal.fire({
        title: "Returned!",
        text: "Book returned successfully.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: error.response?.data?.message || "Failed to return book.",
        icon: "error",
      });
    }
  };

  const deleteBorrowing = async (id) => {
    const result = await Swal.fire({
      title: "Delete Borrowing Data?",
      text: "This data will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/borrowings/${id}`);

      fetchBorrowings();

      Swal.fire({
        title: "Deleted!",
        text: "Borrowing data deleted successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBorrowings();
    fetchMembers();
    fetchBooks();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Borrowings</h1>

        <p className="text-gray-400 mt-1">
          Manage book borrowing and return status
        </p>
      </div>

      <div className="bg-[#111827] border border-white/5 p-5 rounded-2xl shadow mb-6">
        <form onSubmit={addBorrowing} className="grid grid-cols-2 gap-4">
          <select
            value={idMember}
            onChange={(e) => setIdMember(e.target.value)}
            className="bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 focus:border-cyan-500"
            required
          >
            <option value="">Select Member</option>

            {members.map((member) => (
              <option key={member.id_member} value={member.id_member}>
                {member.name}
              </option>
            ))}
          </select>

          <select
            value={idBook}
            onChange={(e) => setIdBook(e.target.value)}
            className="bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 focus:border-cyan-500"
            required
          >
            <option value="">Select Book</option>

            {books.map((book) => (
              <option
                key={book.id_book}
                value={book.id_book}
                disabled={book.stock <= 0}
              >
                {book.title} - Stock: {book.stock}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={borrowingDate}
            onChange={(e) => setBorrowingDate(e.target.value)}
            className="bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 focus:border-cyan-500"
            required
          />

          <input
            type="date"
            value={returnDeadline}
            onChange={(e) => setReturnDeadline(e.target.value)}
            className="bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 focus:border-cyan-500"
            required
          />

          <button
            type="submit"
            className="bg-cyan-600 text-white p-3 rounded-xl hover:bg-cyan-500 transition"
          >
            Add Borrowing
          </button>
        </form>
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-2xl shadow p-5 overflow-auto">
        <table className="w-full">
          <thead className="text-gray-400 text-sm uppercase">
            <tr className="border-b border-white/5">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Member</th>
              <th className="text-left p-3">Book</th>
              <th className="text-left p-3">Borrow Date</th>
              <th className="text-left p-3">Deadline</th>
              <th className="text-left p-3">Return Date</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {borrowings.map((borrowing) => (
              <tr
                key={borrowing.id_borrowing}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-3">{borrowing.id_borrowing}</td>
                <td className="p-3">{borrowing.member_name}</td>
                <td className="p-3">{borrowing.book_title}</td>
                <td className="p-3">{borrowing.borrowing_date}</td>
                <td className="p-3">{borrowing.return_deadline}</td>
                <td className="p-3">{borrowing.return_date || "-"}</td>

                <td className="p-3">
                  {borrowing.status === "Dipinjam" ? (
                    <span className="bg-orange-500/15 text-orange-400 px-3 py-1 rounded-full text-sm">
                      Dipinjam
                    </span>
                  ) : (
                    <span className="bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full text-sm">
                      Dikembalikan
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {borrowing.status === "Dipinjam" && (
                    <button
                      onClick={() => returnBook(borrowing.id_borrowing)}
                      className="bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 px-4 py-2 rounded-lg mr-2 transition"
                    >
                      Return
                    </button>
                  )}

                  <button
                    onClick={() => deleteBorrowing(borrowing.id_borrowing)}
                    className="bg-red-500/15 hover:bg-red-500/25 text-red-400 px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {borrowings.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 p-6">
                  No borrowing data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Borrowings;
