import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[#0aad0a] font-bold">Brand Products</p>
            <h2 className="text-2xl font-extrabold">New Arrival</h2>
          </div>

          <button className="text-[#0aad0a] font-bold">View All</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}