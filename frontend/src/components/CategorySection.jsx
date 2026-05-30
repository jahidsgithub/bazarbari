const categories = [
  { name: "Oil & Ghee", icon: "🛢️" },
  { name: "Honey", icon: "🍯" },
  { name: "Dates", icon: "🌴" },
  { name: "Spices", icon: "🌶️" },
  { name: "Nuts & Seeds", icon: "🥜" },
  { name: "Beverage", icon: "🥤" },
  { name: "Functional Foods", icon: "🌿" },
  { name: "Baby Food", icon: "🍼" },
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-extrabold">Shop By Category</h2>
          <button className="text-[#0aad0a] font-bold">View All</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((item) => (
            <div
              key={item.name}
              className="border rounded-xl p-4 text-center hover:border-[#0aad0a] hover:shadow-md cursor-pointer bg-white"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#f2fff2] flex items-center justify-center text-4xl">
                {item.icon}
              </div>
              <p className="mt-3 font-semibold text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}