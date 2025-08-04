import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/user/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data.users || res.data);
      } catch (err) {
        console.error("Error fetching users", err);

        if (err.response?.status === 403 || err.response?.status === 401) {
          router.push('/login'); 
        }
      }
    };

    fetchUsers();
  }, [router]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/user/signup",
        { username: newUsername, email: newEmail, password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers([...users, { _id: res.data.insertedId, username: newUsername, email: newEmail }]);
      alert("User created successfully!");

      setNewUsername('');
      setNewEmail('');
      setNewPassword('');
    } catch (err) {
      console.error("Creation failed!", err);
      alert("User creation failed.");
    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditUsername(user.username);
    setEditEmail(user.email);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/user/update/${selectedUser._id}`,
        { username: editUsername, email: editEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUsers = users.map((u) =>
        u._id === selectedUser._id ? { ...u, username: editUsername, email: editEmail } : u
      );

      setUsers(updatedUsers);
      setSelectedUser(null);
      setEditUsername('');
      setEditEmail('');
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-gray-300 shadow-xl rounded-xl p-8 w-full max-w-3xl">
        <h2 className="w-full px-4 py-2 border border-black text-black rounded-md">User List</h2>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-white border px-4 py-2 rounded-md"
            >
              <div>
                <p className="text-sm text-gray-600">{user._id}</p>
                <p className="text-sm text-gray-600">{user.username} | {user.email}</p>
              </div>
              <div className="flex gap-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md" onClick={() => handleEdit(user)}>Edit</Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"  onClick={() => deleteUser(user._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md" onClick={() => setShowCreateModal(true)}>+ Create New User</Button>
        </div>
      </div>

      <Modal show={selectedUser !== null} onClose={() => setSelectedUser(null)} size="md">
        <div className="w-[700px] max-w-full">
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-black  text-blue-600 rounded-md"
                placeholder="Updated Username"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
              <input
                type="email"
                className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
                placeholder="Updated Email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpdate}>Update</Button>
            <Button color="gray" onClick={() => setSelectedUser(null)}>Cancel</Button>
          </ModalFooter>
        </div>
      </Modal>

      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} size="md">
        <div className="w-[600px] max-w-full">
          <ModalHeader>Create New User</ModalHeader>
          <ModalBody>
            <form className="space-y-4" onSubmit={handleCreateUser}>
              <input
                type="text"
                className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
              <input
                type="email"
                className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCreateUser}>Create</Button>
            <Button color="gray" onClick={() => setShowCreateModal(false)}>Cancel</Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;
