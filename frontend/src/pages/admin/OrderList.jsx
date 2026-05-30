import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    api
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, order_status) => {
    try {
      await api.put(`/orders/${id}/status`, { order_status });
      loadOrders();
    } catch (error) {
      console.log(error);
      alert("Status update failed");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-2xl font-extrabold mb-5">Order List</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3 font-bold">#{item.id}</td>
                  <td className="p-3">{item.customer_name}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3 max-w-xs">{item.address}</td>
                  <td className="p-3 font-bold">৳{item.total_amount}</td>
                  <td className="p-3">
                    <select
                      value={item.order_status || "Pending"}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="border rounded-md px-3 py-2 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}