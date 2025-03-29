import { useState } from "react";
import { Table, Form } from "react-bootstrap";

export default function UserTable({ users }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? users.map((user) => user.id) : []);
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>
            <Form.Check
              checked={selectedIds.length === users.length && users.length > 0}
              onChange={handleSelectAll}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Last Login</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Form.Check
                checked={selectedIds.includes(user.id)}
                onChange={() => handleSelectOne(user.id)}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <span
                className={`badge bg-${
                  user.status === "active" ? "success" : "danger"
                }`}
              >
                {user.status}
              </span>
            </td>
            <td>{new Date(user.last_login).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
