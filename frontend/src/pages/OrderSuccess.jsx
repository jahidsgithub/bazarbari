import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.order_id;

  return (
    <>
      <Navbar />

      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white border shadow-sm rounded-xl p-10 text-center">
          <CheckCircle size={80} className="mx-auto text-[#0aad0a]" />

          <h1 className="text-3xl font-extrabold mt-5">
            Order Placed Successfully
          </h1>

          <p className="text-slate-600 mt-3">
            Thank you for shopping with Bazar Bari.
          </p>

          {orderId && (
            <p className="mt-5 text-lg font-bold">
              Order ID: <span className="text-[#0aad0a]">#{orderId}</span>
            </p>
          )}

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => navigate("/")}
              className="bg-[#0aad0a] hover:bg-[#087f23] text-white px-6 py-3 rounded-md font-bold"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="border border-[#0aad0a] text-[#0aad0a] px-6 py-3 rounded-md font-bold"
            >
              View Cart
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}