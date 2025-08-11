import React, { useEffect, useState } from 'react';
import axios from 'axios';

//added admin dashhboard
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const usersRes = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const productsRes = await axios.get('/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(usersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      console.error(err);
      setError('Unauthorized or failed to fetch admin data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/admin/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  if (error) return <div><h2>{error}</h2></div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>All Users</h2>
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => deleteUser(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>All Products</h2>
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost</th>
              <th>Description</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.cost}</td>
                <td>{p.description}</td>
                <td>{p.contact}</td>
                <td>
                  <button onClick={() => deleteProduct(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;
