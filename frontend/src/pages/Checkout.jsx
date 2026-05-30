import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    phone: "",
    address: "",
    note: "",
  });

  const deliveryCharge = cartItems.length > 0 ? 60 : 0;
  const total = cartTotal + deliveryCharge;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      user_id: null,
      customer_name: form.customer_name,
      customer_email: form.customer_email,
      phone: form.phone,
      address: form.address,
      subtotal: cartTotal,
      delivery_charge: deliveryCharge,
      total_amount: total,
      payment_method: "Cash On Delivery",
      note: form.note,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await api.post("/orders", orderData);

      clearCart();

      navigate("/order-success", {
        state: {
          order_id: res.data.order_id,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Order failed");
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-6">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <form
            onSubmit={placeOrder}
            className="lg:col-span-2 bg-white rounded-xl border shadow-sm p-6"
          >
            <h2 className="text-xl font-bold mb-5">
              Delivery Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="border rounded-md px-4 py-3 outline-none focus:border-[#0aad0a]"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Phone Number"
                className="border rounded-md px-4 py-3 outline-none focus:border-[#0aad0a]"
              />

              <input
                name="customer_email"
                value={form.customer_email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border rounded-md px-4 py-3 outline-none focus:border-[#0aad0a]"
              />

              <input
                value="Cash On Delivery"
                disabled
                className="border rounded-md px-4 py-3 bg-slate-100 text-slate-600"
              />
            </div>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Full Delivery Address"
              rows="4"
              className="mt-4 w-full border rounded-md px-4 py-3 outline-none focus:border-[#0aad0a]"
            />

            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Order Note Optional"
              rows="3"
              className="mt-4 w-full border rounded-md px-4 py-3 outline-none focus:border-[#0aad0a]"
            />

            <button
              type="submit"
              className="mt-5 bg-[#0aad0a] hover:bg-[#087f23] text-white px-8 py-3 rounded-md font-bold"
            >
              Place Order
            </button>
          </form>

          <div className="bg-white rounded-xl border shadow-sm p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-slate-500">
                No items in cart.
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-3 gap-4"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold whitespace-nowrap">
                    ৳{Number(item.price) * item.quantity}
                  </p>
                </div>
              ))
            )}

            <div className="flex justify-between py-3">
              <span>Subtotal</span>
              <span>৳{cartTotal}</span>
            </div>

            <div className="flex justify-between py-3">
              <span>Delivery Charge</span>
              <span>৳{deliveryCharge}</span>
            </div>

            <div className="flex justify-between border-t pt-4 font-extrabold text-lg">
              <span>Total</span>
              <span>৳{total}</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}