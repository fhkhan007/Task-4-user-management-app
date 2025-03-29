import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserTable from "../components/UserTable";
import Toolbar from "../components/Toolbar";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleUserAction = async (action) => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/actions",
        { action, userIds: selectedIds },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchUsers();
      setSelectedIds([]);
    } catch (err) {
      alert(`Failed to ${action} users`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <Toolbar
        selectedCount={selectedIds.length}
        onBlock={() => handleUserAction("block")}
        onUnblock={() => handleUserAction("unblock")}
        onDelete={() => handleUserAction("delete")}
      />
      <UserTable
        users={users}
        selectedIds={selectedIds}
        onSelect={setSelectedIds}
      />
    </div>
  );
}
