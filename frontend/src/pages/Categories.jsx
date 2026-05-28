import { useEffect, useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");

  const [editId, setEditId] = useState(null);

  // FETCH DATA
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.error(error);
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
        <h1 className="text-3xl font-bold">Categories</h1>
      </div>

      {/* FORM */}

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <form
          onSubmit={editId ? updateCategory : addCategory}
          className="flex gap-4"
        >
          <input
            type="text"
            placeholder="Enter category name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 border rounded-lg p-3 outline-none"
            required
          />

          <button
            type="submit"
            className="bg-blue-900 text-white px-5 rounded-lg hover:bg-blue-800"
          >
            {editId ? "Update Category" : "Add Category"}
          </button>
        </form>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow p-5">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">ID</th>

              <th className="text-left p-3">Category Name</th>

              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id_category}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{category.id_category}</td>

                <td className="p-3">{category.category_name}</td>

                <td className="p-3">
                  <button
                    onClick={() => editCategory(category)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id_category)}
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

export default Categories;
