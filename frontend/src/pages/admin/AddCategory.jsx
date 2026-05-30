import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

export default function AddCategory() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    status: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
      slug: name === "name" ? value.toLowerCase().replaceAll(" ", "-") : form.slug,
    });
  };

  const submitCategory = async (e) => {
    e.preventDefault();

    try {
      await api.post("/categories", form);
      alert("Category added successfully");
      setForm({ name: "", slug: "", image: "", status: 1 });
    } catch (error) {
      console.log(error);
      alert("Category add failed");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-2xl font-extrabold mb-5">Add Category</h2>

        <form onSubmit={submitCategory} className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Category Name"
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            placeholder="Slug"
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image filename optional"
            className="border rounded-lg px-4 py-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>

          <button className="bg-[#0aad0a] hover:bg-[#087f23] text-white px-6 py-3 rounded-lg font-bold">
            Save Category
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}