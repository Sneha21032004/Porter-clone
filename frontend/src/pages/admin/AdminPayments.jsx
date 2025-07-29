import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/payments')
      .then(res => setPayments(res.data));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">All Payments</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr><th>ID</th><th>User Email</th><th>Pickup</th><th>Drop</th><th>Vehicle</th><th>Price</th><th>Method</th></tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td>{p.id}</td><td>{p.email}</td><td>{p.pickup}</td><td>{p.drop_location}</td><td>{p.vehicle}</td>
              <td>₹{p.price}</td><td>{p.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};
export default AdminPayments;