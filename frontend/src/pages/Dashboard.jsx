import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTags,
  FaUsers,
  FaBook,
  FaExchangeAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../services/api";

import {
  dummyCategories,
  dummyMembers,
  dummyBooks,
  dummyBorrowings,
} from "../data/dummyData";

const Dashboard = () => {
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalBorrowings, setTotalBorrowings] = useState(0);
  const [borrowedBooks, setBorrowedBooks] = useState(0);
  const [returnedBooks, setReturnedBooks] = useState(0);
  const [recentBorrowings, setRecentBorrowings] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const categories = await api.get("/categories");
      const members = await api.get("/members");
      const books = await api.get("/books");
      const borrowings = await api.get("/borrowings");

      const borrowingData = borrowings.data;

      setTotalCategories(categories.data.length);
      setTotalMembers(members.data.length);
      setTotalBooks(books.data.length);
      setTotalBorrowings(borrowingData.length);

      setBorrowedBooks(
        borrowingData.filter((item) => item.status === "Dipinjam").length,
      );

      setReturnedBooks(
        borrowingData.filter((item) => item.status === "Dikembalikan").length,
      );

      setRecentBorrowings(borrowingData.slice(-5).reverse());
    } catch {
      const borrowingData = dummyBorrowings;

      setTotalCategories(dummyCategories.length);
      setTotalMembers(dummyMembers.length);
      setTotalBooks(dummyBooks.length);
      setTotalBorrowings(borrowingData.length);

      setBorrowedBooks(
        borrowingData.filter((item) => item.status === "Dipinjam").length,
      );

      setReturnedBooks(
        borrowingData.filter((item) => item.status === "Dikembalikan").length,
      );

      setRecentBorrowings(borrowingData.slice(-5).reverse());
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Total Categories",
      value: totalCategories,
      icon: <FaTags />,
      color: "text-blue-500",
    },
    {
      title: "Total Members",
      value: totalMembers,
      icon: <FaUsers />,
      color: "text-emerald-500",
    },
    {
      title: "Total Books",
      value: totalBooks,
      icon: <FaBook />,
      color: "text-purple-500",
    },
    {
      title: "Total Borrowings",
      value: totalBorrowings,
      icon: <FaExchangeAlt />,
      color: "text-cyan-500",
    },
    {
      title: "Borrowed Books",
      value: borrowedBooks,
      icon: <FaClock />,
      color: "text-orange-400",
    },
    {
      title: "Returned Books",
      value: returnedBooks,
      icon: <FaCheckCircle />,
      color: "text-emerald-400",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <p className="text-gray-400 mt-1">
          Overview of library data and borrowing activity
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-[#111827] border border-white/5 rounded-2xl shadow p-6 flex items-center justify-between"
          >
            <div>
              <h2 className="text-gray-400 mb-3">{item.title}</h2>

              <h1 className={`text-4xl font-bold ${item.color}`}>
                {item.value}
              </h1>
            </div>

            <div className={`text-3xl ${item.color} opacity-80`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* RECENT BORROWINGS */}
        <div className="col-span-2 bg-[#111827] border border-white/5 rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-xl font-bold text-white">
                Recent Borrowings
              </h2>

              <p className="text-gray-400 text-sm">
                Latest borrowing transactions
              </p>
            </div>

            <Link
              to="/borrowings"
              className="text-cyan-400 text-sm hover:text-cyan-300"
            >
              View All
            </Link>
          </div>

          <table className="w-full">
            <thead className="text-gray-400 text-sm uppercase">
              <tr className="border-b border-white/5">
                <th className="text-left p-3">Member</th>
                <th className="text-left p-3">Book</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBorrowings.map((item) => (
                <tr
                  key={item.id_borrowing}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-3">{item.member_name}</td>
                  <td className="p-3">{item.book_title}</td>
                  <td className="p-3">{item.borrowing_date}</td>
                  <td className="p-3">
                    {item.status === "Dipinjam" ? (
                      <span className="bg-orange-500/15 text-orange-400 px-3 py-1 rounded-full text-sm">
                        Dipinjam
                      </span>
                    ) : (
                      <span className="bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full text-sm">
                        Dikembalikan
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {recentBorrowings.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 p-6">
                    No recent borrowing data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-white mb-2">Quick Actions</h2>

          <p className="text-gray-400 text-sm mb-5">
            Shortcut to manage library data
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/books"
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-3 rounded-xl transition"
            >
              + Add Book
            </Link>

            <Link
              to="/members"
              className="bg-white/5 hover:bg-white/10 text-gray-200 px-4 py-3 rounded-xl transition"
            >
              + Add Member
            </Link>

            <Link
              to="/borrowings"
              className="bg-white/5 hover:bg-white/10 text-gray-200 px-4 py-3 rounded-xl transition"
            >
              + Add Borrowing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
