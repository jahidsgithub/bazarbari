import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import FlashSale from "../components/FlashSale";
import Footer from "../components/Footer";
import FloatingCart from "../components/FloatingCart";
import api from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <HeroSlider />
      <CategorySection />
      <FlashSale products={products} />
      <ProductSection />
      <FloatingCart />
      <Footer />
    </>
  );
}