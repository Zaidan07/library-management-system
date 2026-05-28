import { useEffect, useState } from "react";
import api from "../src/services/api";
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Members</h1>

        <p className="text-gray-400 mt-1">Manage library member data</p>
      </div>

      <div className="bg-[#111827] border border-white/5 p-5 rounded-2xl shadow mb-6">
        <form
          onSubmit={editId ? updateMember : addMember}
          className="grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Member Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 placeholder:text-gray-500 focus:border-cyan-500"
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 placeholder:text-gray-500 focus:border-cyan-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 placeholder:text-gray-500 focus:border-cyan-500"
            required
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-[#0b1220] border border-white/10 rounded-xl p-3 outline-none text-gray-100 placeholder:text-gray-500 focus:border-cyan-500"
            required
          />

          <button
            type="submit"
            className="bg-cyan-600 text-white p-3 rounded-xl hover:bg-cyan-500 transition"
          >
            {editId ? "Update Member" : "Add Member"}
          </button>
        </form>
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-2xl shadow p-5 overflow-auto">
        <table className="w-full">
          <thead className="text-gray-400 text-sm uppercase">
            <tr className="border-b border-white/5">
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
              <tr
                key={member.id_member}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-3">{member.id_member}</td>
                <td className="p-3">{member.name}</td>
                <td className="p-3">{member.phone_number}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.address}</td>
                <td className="p-3">
                  <button
                    onClick={() => editMember(member)}
                    className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 px-4 py-2 rounded-lg mr-2 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMember(member.id_member)}
                    className="bg-red-500/15 hover:bg-red-500/25 text-red-400 px-4 py-2 rounded-lg transition"
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
