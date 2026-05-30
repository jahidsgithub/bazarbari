import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FloatingCart() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();

  return (
    <button
      onClick={() => navigate("/cart")}
      className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 bg-[#0aad0a] text-white rounded-l-xl shadow-2xl z-50 overflow-hidden"
    >
      <div className="px-4 py-3 flex flex-col items-center border-b border-white/20">
        <ShoppingCart />
        <span className="text-sm font-bold">{cartItems.length} Items</span>
      </div>

      <div className="bg-white text-[#0aad0a] px-4 py-3 font-extrabold">
        ৳{cartTotal}
      </div>
    </button>
  );
}