import { useEffect, useState } from "react";

import api from "../services/api";

const Dashboard = () => {

  const [totalCategories, setTotalCategories] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  const fetchDashboardData = async () => {

    try {

      const categories = await api.get("/categories");
      const members = await api.get("/members");
      const books = await api.get("/books");

      setTotalCategories(categories.data.length);
      setTotalMembers(members.data.length);
      setTotalBooks(books.data.length);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {/* CARDS */}

      <div className="grid grid-cols-3 gap-6">

        {/* CATEGORY */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500 mb-2">
            Total Categories
          </h2>

          <h1 className="text-4xl font-bold text-blue-900">
            {totalCategories}
          </h1>

        </div>

        {/* MEMBERS */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500 mb-2">
            Total Members
          </h2>

          <h1 className="text-4xl font-bold text-green-600">
            {totalMembers}
          </h1>

        </div>

        {/* BOOKS */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500 mb-2">
            Total Books
          </h2>

          <h1 className="text-4xl font-bold text-purple-600">
            {totalBooks}
          </h1>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;