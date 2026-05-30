import { Clock } from "lucide-react";
import ProductCard from "./ProductCard";

export default function FlashSale({ products = [] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-[#ff7a00] font-bold">Offer Zone</p>
            <h2 className="text-2xl font-extrabold">Flash Sale</h2>
          </div>

          <div className="bg-[#ff7a00] text-white px-4 py-2 rounded-md font-bold flex gap-2 items-center">
            <Clock size={18} />
            12 : 45 : 30
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}