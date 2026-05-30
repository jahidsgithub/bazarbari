import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import api from "../../services/api";
import { Trash2, Pencil, ImageOff } from "lucide-react";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (error) {
      console.log(error);
      alert("Product delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[#0aad0a] font-bold">
              Product Management
            </p>

            <h2 className="text-2xl font-extrabold">
              Product List
            </h2>
          </div>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-[#0aad0a] hover:bg-[#087f23] text-white px-5 py-2 rounded-lg font-bold"
          >
            + Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-100 text-left text-slate-700">
                <th className="p-3">ID</th>
                <th className="p-3">Image</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Old Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="p-6 text-center text-slate-500"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-3 font-semibold">
                      #{item.id}
                    </td>

                    <td className="p-3">
                      {item.image ? (
                        <img
                          src={`http://localhost:5000/uploads/${item.image}`}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-slate-100 rounded-lg border flex items-center justify-center text-slate-400">
                          <ImageOff size={20} />
                        </div>
                      )}
                    </td>

                    <td className="p-3">
                      <p className="font-bold text-slate-800">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.slug}
                      </p>
                    </td>

                    <td className="p-3 font-bold text-[#0aad0a]">
                      ৳{item.price}
                    </td>

                    <td className="p-3 text-slate-500">
                      {item.old_price ? `৳${item.old_price}` : "-"}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          Number(item.stock) > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 0
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.status === 0 ? "Inactive" : "Active"}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-product/${item.id}`)
                          }
                          className="w-9 h-9 rounded-lg bg-green-50 text-[#0aad0a] flex items-center justify-center hover:bg-green-100"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}