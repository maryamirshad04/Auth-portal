import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import View from "./Users/List/View";
import UserFormCreate from "./Users/UserFormCreate";
import UserFormEdit from "./Users/UserFormEdit";

const User = () => {
  const [users, setUsers] = useState([]); // always an array
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchUsers = async (page = 1) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:5000/user/list?page=${page}&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data.users || []); // fallback to empty array
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
    } catch (err) {
      console.error("Error fetching users", err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleCreateUser = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/user/signup",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // refresh list from backend so pagination is consistent
      fetchUsers(currentPage);
      setShowCreateModal(false);
      alert("User created successfully!");
    } catch (err) {
      console.error("Creation failed!", err);
      alert("User creation failed.");
    }
  };

  const handleUpdate = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/user/update/${selectedUser._id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(currentPage);
      setSelectedUser(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:5000/user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(currentPage);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-gray-300 shadow-xl rounded-xl p-8 w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-2 mb-4 w-full">
          <h2 className="px-4 py-2 border border-gray-950 text-blue-700 rounded-md w-full sm:w-56 text-center sm:text-left">
            User List
            <div className="justify-end items-end">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/signup");
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                  font-medium rounded-full text-sm p-2.5 text-end inline-flex items-end sm:items-center
                  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25h-6A2.25 2.25 0 005.25 5.25v13.5a2.25 2.25 0 002.25 2.25h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
                <span className="sr-only">Logout</span>
              </button>
            </div>
          </h2>
          <div className="justify-end">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-normal px-4 py-2 rounded-md shadow-md transition-colors duration-200 sm:w-56"
            >
              Create User
            </button>
          </div>
        </div>

        <View
          users={users}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onEdit={setSelectedUser}
          onDelete={deleteUser}
        />
      </div>
      <UserFormEdit
        show={!!selectedUser}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onUpdate={handleUpdate}
      />
      <UserFormCreate
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
};

export default User;
