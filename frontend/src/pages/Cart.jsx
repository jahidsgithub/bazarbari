import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const deliveryCharge = cartItems.length > 0 ? 60 : 0;

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-6 text-slate-900">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border p-6">
            {cartItems.length === 0 ? (
              <p className="text-slate-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <div>
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <p className="text-[#00A651] font-bold">৳{item.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="font-bold">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>

                    <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                      <Trash2 size={19} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>৳{cartTotal}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Delivery</span>
              <span>৳{deliveryCharge}</span>
            </div>

            <div className="flex justify-between py-4 border-t mt-3 font-extrabold text-lg">
              <span>Total</span>
              <span>৳{cartTotal + deliveryCharge}</span>
            </div>

            <button className="w-full bg-[#00A651] hover:bg-[#00843D] text-white py-3 rounded-2xl font-bold">
              Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
}