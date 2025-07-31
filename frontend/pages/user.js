import { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/user/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data.users || res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/user/signup",
        { username, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers([...users, { _id: res.data.insertedId, username, email }]);
      alert("User created successfully!");

      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error("Creation failed!", err);
      alert("User creation failed.");
    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:5000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUsername(user.username);
    setEmail(user.email);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/user/update/${selectedUser._id}`,
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUsers = users.map((u) =>
        u._id === selectedUser._id ? { ...u, username, email } : u
      );

      setUsers(updatedUsers);
      setSelectedUser(null);
      setUsername('');
      setEmail('');
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user._id} style={{ marginBottom: "10px" }}>
          {user._id}  [{user.username}| {user.email}]
          <button onClick={() => handleEdit(user)} style={{ marginLeft: "10px" }}>Edit</button>
          <button onClick={() => deleteUser(user._id)} style={{ marginLeft: "10px" }}>Delete</button>
        </div>
      ))}

      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Updated Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Updated Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleUpdate}>Update User</button>
          <button onClick={() => setSelectedUser(null)} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h3>Create New User</h3>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default UserList;
