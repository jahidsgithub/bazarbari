import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category_id: 1,
    name: "",
    slug: "",
    price: "",
    old_price: "",
    stock: "",
    short_description: "",
    description: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setForm({
          category_id: res.data.category_id || 1,
          name: res.data.name || "",
          slug: res.data.slug || "",
          price: res.data.price || "",
          old_price: res.data.old_price || "",
          stock: res.data.stock || "",
          short_description: res.data.short_description || "",
          description: res.data.description || "",
          image: res.data.image || "",
        });

        if (res.data.image) {
          setPreview(`http://localhost:5000/uploads/${res.data.image}`);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
      slug:
        name === "name"
          ? value.toLowerCase().replaceAll(" ", "-")
          : form.slug,
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await api.post("/upload/product-image", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        ...form,
        image: res.data.filename,
      });

      setPreview(res.data.image_url);
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${id}`, form);
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Product update failed");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-2xl font-extrabold mb-5">Edit Product</h2>

        <form onSubmit={updateProduct} className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Product Name"
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
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            placeholder="Price"
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="old_price"
            value={form.old_price}
            onChange={handleChange}
            placeholder="Old Price"
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            placeholder="Stock"
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="border rounded-lg px-4 py-3"
          />

          {preview && (
            <div className="md:col-span-2">
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-xl border"
              />
            </div>
          )}

          <textarea
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            placeholder="Short Description"
            className="md:col-span-2 border rounded-lg px-4 py-3"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Full Description"
            rows="5"
            className="md:col-span-2 border rounded-lg px-4 py-3"
          />

          <button className="bg-[#0aad0a] hover:bg-[#087f23] text-white px-6 py-3 rounded-lg font-bold">
            Update Product
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}