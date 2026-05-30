export default function HeroSlider() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-6">
      <div className="grid lg:grid-cols-4 gap-5">
        <aside className="hidden lg:block bg-white rounded-xl border shadow-sm overflow-hidden">
          {[
            "Oil & Ghee",
            "Honey",
            "Dates",
            "Spices",
            "Nuts & Seeds",
            "Beverage",
            "Functional Foods",
            "Baby Food",
          ].map((item) => (
            <div
              key={item}
              className="px-5 py-3 border-b hover:bg-[#f2fff2] cursor-pointer font-medium"
            >
              {item}
            </div>
          ))}
        </aside>

        <div className="lg:col-span-2 bg-gradient-to-r from-[#f2fff2] to-white rounded-xl border shadow-sm p-8 min-h-[360px] relative overflow-hidden">
          <div className="max-w-md">
            <p className="text-[#ff7a00] font-bold">Safe & Reliable Food</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-3 leading-tight">
              Pure Food For Every Home
            </h1>
            <p className="text-slate-600 mt-4">
              Premium honey, dates, spices, nuts and grocery essentials delivered fast.
            </p>
            <button className="mt-6 bg-[#0aad0a] text-white px-7 py-3 rounded-md font-bold">
              Shop Now
            </button>
          </div>

          <div className="absolute right-6 bottom-6 text-8xl">🍯🌿</div>
        </div>

        <div className="grid gap-5">
          <div className="bg-white rounded-xl border shadow-sm p-6 relative overflow-hidden">
            <p className="text-[#ff7a00] font-bold">Save 10%</p>
            <h3 className="text-2xl font-extrabold mt-1">Organic Honey</h3>
            <div className="absolute right-4 bottom-3 text-6xl">🍯</div>
          </div>

          <div className="bg-[#fff7ed] rounded-xl border border-orange-100 p-6 relative overflow-hidden">
            <p className="text-[#0aad0a] font-bold">New Arrival</p>
            <h3 className="text-2xl font-extrabold mt-1">Premium Dates</h3>
            <div className="absolute right-4 bottom-3 text-6xl">🌴</div>
          </div>
        </div>
      </div>
    </section>
  );
}