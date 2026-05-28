import { useEffect, useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";

const Members = () => {
  const [members, setMembers] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);

  // FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const response = await api.get("/members");

      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ADD MEMBER
  const addMember = async (e) => {
    e.preventDefault();

    try {
      await api.post("/members", {
        name,
        address,
        phone_number: phoneNumber,
        email,
      });

      resetForm();

      await fetchMembers();

      Swal.fire({
        title: "Success!",
        text: "Member added successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // EDIT MODE
  const editMember = (member) => {
    setEditId(member.id_member);

    setName(member.name);
    setAddress(member.address);
    setPhoneNumber(member.phone_number);
    setEmail(member.email);
  };

  // UPDATE MEMBER
  const updateMember = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/members/${editId}`, {
        name,
        address,
        phone_number: phoneNumber,
        email,
      });

      resetForm();

      fetchMembers();

      Swal.fire({
        title: "Updated!",
        text: "Member updated successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE MEMBER
  const deleteMember = async (id) => {
    const result = await Swal.fire({
      title: "Delete Member?",
      text: "This data will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/members/${id}`);

      fetchMembers();

      Swal.fire({
        title: "Deleted!",
        text: "Member deleted successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setName("");
    setAddress("");
    setPhoneNumber("");
    setEmail("");

    setEditId(null);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Members</h1>

      {/* FORM */}

      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <form
          onSubmit={editId ? updateMember : addMember}
          className="grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Member Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-lg p-3 outline-none"
            required
          />

          <button
            type="submit"
            className="bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800"
          >
            {editId ? "Update Member" : "Add Member"}
          </button>
        </form>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow p-5 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Address</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id_member} className="border-b hover:bg-gray-50">
                <td className="p-3">{member.id_member}</td>

                <td className="p-3">{member.name}</td>

                <td className="p-3">{member.phone_number}</td>

                <td className="p-3">{member.email}</td>

                <td className="p-3">{member.address}</td>

                <td className="p-3">
                  <button
                    onClick={() => editMember(member)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMember(member.id_member)}
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

export default Members;
