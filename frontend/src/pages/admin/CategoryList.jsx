import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";
import { Trash2 } from "lucide-react";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  const loadCategories = () => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const deleteCategory = async (id) => {
    if (!confirm("Delete this category?")) return;

    await api.delete(`/categories/${id}`);
    loadCategories();
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-2xl font-extrabold mb-5">Category List</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">#{item.id}</td>
                <td className="p-3 font-bold">{item.name}</td>
                <td className="p-3">{item.slug}</td>
                <td className="p-3">{item.status === 1 ? "Active" : "Inactive"}</td>
                <td className="p-3">
                  <button onClick={() => deleteCategory(item.id)} className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}