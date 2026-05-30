import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Star } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-10">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white rounded-[2rem] border shadow-sm p-6 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#EAF8F0] to-[#FFF1E8] rounded-[2rem] h-[420px] flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img
  src={`http://localhost:5000/uploads/${product.image}`}
  alt={product.name}
  className="w-full h-full object-cover"
/>
            ) : (
              <span className="text-8xl">🛒</span>
            )}
          </div>

          <div>
            <p className="text-[#00A651] font-bold">Premium Product</p>

            <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 text-yellow-500 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
              <span className="text-slate-500 text-sm ml-2">(4.9 Reviews)</span>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <span className="text-4xl font-extrabold text-[#00A651]">
                ৳{product.price}
              </span>

              {product.old_price && (
                <span className="text-slate-400 line-through text-xl">
                  ৳{product.old_price}
                </span>
              )}
            </div>

            <p className="text-slate-600 mt-5 leading-7">
              {product.description || product.short_description || "Fresh and quality product for daily use."}
            </p>

            <p className="mt-5 font-semibold">
              Stock: <span className="text-[#00A651]">{product.stock}</span>
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-8 bg-[#00A651] hover:bg-[#00843D] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}