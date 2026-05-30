import { ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const discount =
    product.old_price && product.price
      ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
      : 0;

  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg overflow-hidden group">
      <div className="relative h-52 bg-[#f6fff6] flex items-center justify-center">
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#ff7a00] text-white text-xs px-2 py-1 rounded">
            Save {discount}%
          </span>
        )}

        <span className="absolute top-3 right-3 bg-[#0aad0a] text-white text-xs px-2 py-1 rounded">
          New Arrival
        </span>

        {product.image ? (
            <img
    src={`http://localhost:5000/uploads/${product.image}`}
    alt={product.name}
    className="w-full h-full object-cover group-hover:scale-105 duration-300"
  />
        ) : (
          <span className="text-7xl">🛒</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold h-12 line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-2">
          <span className="text-xl font-extrabold text-[#0aad0a]">
            ৳{product.price}
          </span>
          {product.old_price && (
            <span className="ml-2 text-slate-400 line-through">
              ৳{product.old_price}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-[#0aad0a] hover:bg-[#087f23] text-white py-2.5 rounded-md font-bold flex justify-center items-center gap-2"
        >
          <ShoppingCart size={18} />
          Add To Cart
        </button>

        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="mt-2 w-full border border-[#0aad0a] text-[#0aad0a] py-2.5 rounded-md font-bold flex justify-center items-center gap-2"
        >
          <Eye size={18} />
          View Details
        </button>
      </div>
    </div>
  );
}