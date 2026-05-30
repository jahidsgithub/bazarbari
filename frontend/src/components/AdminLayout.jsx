import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  LogOut,
  Tags,
  ListTree,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r min-h-screen hidden md:block">
        <div className="p-5 text-2xl font-extrabold text-[#0aad0a]">
          Bazar<span className="text-[#ff7a00]">Bari</span>
          <p className="text-xs text-slate-400 font-normal">
            Admin Panel
          </p>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f2fff2] font-semibold"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f2fff2] font-semibold"
          >
            <Package size={19} />
            Product List
          </Link>

          <Link
            to="/admin/add-product"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f2fff2] font-semibold"
          >
            <PlusCircle size={19} />
            Add Product
          </Link>

          <Link
            to="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f2fff2] font-semibold"
          >
            <ListTree size={19} />
            Category List
          </Link>

          <Link
            to="/admin/add-category"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f2fff2] font-semibold"
          >
            <Tags size={19} />
            Add Category
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#f2fff2] font-semibold"
          >
            <ShoppingBag size={19} />
            Order List
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-500 font-semibold"
          >
            <LogOut size={19} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1">
        <div className="bg-white border-b px-6 py-4 flex justify-between">
          <h1 className="font-bold">Admin Dashboard</h1>
          <span className="text-sm text-slate-500">
            Bazar Bari Ecommerce
          </span>
        </div>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}