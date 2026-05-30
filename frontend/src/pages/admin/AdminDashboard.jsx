import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";
import { Package, ShoppingBag, Users, Banknote } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    sales: 0,
  });

  useEffect(() => {
    api.get("/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cards = [
    { title: "Products", value: stats.products, icon: Package },
    { title: "Orders", value: stats.orders, icon: ShoppingBag },
    { title: "Customers", value: stats.customers, icon: Users },
    { title: "Sales", value: `৳${stats.sales}`, icon: Banknote },
  ];

  return (
    <AdminLayout>
      <div className="grid md:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} className="bg-white rounded-xl border shadow-sm p-6">
              <div className="w-12 h-12 bg-[#f2fff2] text-[#0aad0a] rounded-xl flex items-center justify-center mb-4">
                <Icon />
              </div>

              <p className="text-slate-500">{card.title}</p>
              <h2 className="text-3xl font-extrabold mt-1">{card.value}</h2>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}