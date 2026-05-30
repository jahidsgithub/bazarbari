import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Home,
  Heart,
  Phone,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();

  return (
    <>
      <header className="bg-white sticky top-0 z-50 border-b border-slate-200">
        <div className="bg-[#0aad0a] text-white text-sm">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <Phone size={14} /> 09642-922922
              </span>
              <span className="hidden md:flex items-center gap-1">
                <MapPin size={14} /> Safe food delivered to every home
              </span>
            </div>

            <div className="hidden md:flex gap-5">
              <span>Track Order</span>
              <span>Support</span>
              <span>Login/Register</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button className="lg:hidden">
            <Menu />
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-3xl font-extrabold text-[#0aad0a]"
          >
            Bazar<span className="text-[#ff7a00]">Bari</span>
          </button>

          <div className="hidden md:flex flex-1 border-2 border-[#0aad0a] rounded-md overflow-hidden">
            <input
              className="flex-1 px-4 outline-none"
              placeholder="Search Products"
            />
            <button className="bg-[#0aad0a] text-white px-6">
              <Search />
            </button>
          </div>

          <button className="hidden md:flex items-center gap-2 text-slate-700">
            <User size={22} />
            <div className="text-left leading-tight">
              <p className="text-xs text-slate-500">Hello there!</p>
              <p className="font-semibold">Signin</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="hidden md:flex items-center gap-3 bg-[#f2fff2] border border-green-100 px-4 py-2 rounded-md"
          >
            <div className="relative text-[#0aad0a]">
              <ShoppingCart />
              <span className="absolute -top-2 -right-3 bg-[#ff7a00] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs text-slate-500">{cartItems.length} Items</p>
              <p className="font-bold">৳{cartTotal}</p>
            </div>
          </button>
        </div>

        <div className="hidden lg:block border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-7 py-3 text-sm font-semibold">
            <button className="bg-[#0aad0a] text-white px-5 py-2 rounded-md flex items-center gap-2">
              <Menu size={18} /> Menu
            </button>
            <span>Oil & Ghee</span>
            <span>Honey</span>
            <span>Dates</span>
            <span>Spices</span>
            <span>Nuts & Seeds</span>
            <span>Beverage</span>
            <span>Functional Foods</span>
            <span className="text-[#ff7a00]">Offer Zone</span>
          </div>
        </div>
      </header>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 grid grid-cols-5 text-xs text-slate-600">
        <button onClick={() => navigate("/")} className="py-2 flex flex-col items-center">
          <Home size={20} /> Home
        </button>
        <button className="py-2 flex flex-col items-center">
          <Menu size={20} /> Menu
        </button>
        <button onClick={() => navigate("/cart")} className="py-2 flex flex-col items-center text-[#0aad0a]">
          <ShoppingCart size={20} /> Cart
        </button>
        <button className="py-2 flex flex-col items-center">
          <Search size={20} /> Search
        </button>
        <button className="py-2 flex flex-col items-center">
          <User size={20} /> Account
        </button>
      </div>
    </>
  );
}