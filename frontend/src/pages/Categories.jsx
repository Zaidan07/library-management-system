import { useEffect, useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
import { dummyCategories } from "../data/dummyData";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch {
      console.warn("Backend not running. Using dummy categories data.");

      setCategories(dummyCategories);
    }
  };

  // ADD CATEGORY
  const addCategory = async (e) => {
    e.preventDefault();

    try {
      await api.post("/categories", {
        category_name: categoryName,
      });

      setCategoryName("");

      await fetchCategories();

      Swal.fire({
        title: "Success!",
        text: "Category added successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: "This data will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/categories/${id}`);

      await fetchCategories();

      Swal.fire({
        title: "Deleted!",
        text: "Category deleted successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editCategory = (category) => {
    setEditId(category.id_category);

    setCategoryName(category.category_name);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategory = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/categories/${editId}`, {
        category_name: categoryName,
      });

      setCategoryName("");

      setEditId(null);

      await fetchCategories();

      Swal.fire({
        title: "Updated!",
        text: "Category updated successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Categories</h1>

          <p className="text-gray-400 mt-1">Manage library book categories</p>
        </div>
      </div>

      <div className="bg-[#111827] border border-white/5 p-5 rounded-2xl shadow mb-6">
        <form
          onSubmit={editId ? updateCategory : addCategory}
          className="flex gap-4"
        >
          <input
            type="text"
            placeholder="Enter category name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 placeholder:text-gray-500 focus:border-cyan-500"
            required
          />

          <button
            type="submit"
            className="bg-cyan-600 text-white px-5 rounded-xl hover:bg-cyan-500 transition"
          >
            {editId ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-2xl shadow p-5 overflow-auto">
        <table className="w-full">
          <thead className="text-gray-400 text-sm uppercase">
            <tr className="border-b border-white/5">
              <th className="text-left p-3">ID</th>

              <th className="text-left p-3">Category Name</th>

              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id_category}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-3">{category.id_category}</td>

                <td className="p-3">{category.category_name}</td>

                <td className="p-3">
                  <button
                    onClick={() => editCategory(category)}
                    className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 px-4 py-2 rounded-lg mr-2 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id_category)}
                    className="bg-red-500/15 hover:bg-red-500/25 text-red-400 px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 p-6">
                  No category data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
