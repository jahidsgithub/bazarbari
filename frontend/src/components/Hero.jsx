import { ArrowRight, ShieldCheck, Truck, BadgePercent } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF8F0] via-white to-[#FFF4EA]">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00A651]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-white shadow-sm border border-slate-100 text-[#00A651] px-4 py-2 rounded-full text-sm font-semibold">
            <BadgePercent size={17} />
            Premium Grocery Experience
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Fresh Products,
            <br />
            <span className="text-[#00A651]">Premium Delivery</span>
          </h1>

          <p className="mt-5 text-slate-600 text-lg max-w-xl">
            Daily grocery, fruits, vegetables, fish, meat and household essentials delivered fast.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-[#00A651] hover:bg-[#00843D] text-white px-7 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg shadow-green-200">
              Shop Now <ArrowRight size={18} />
            </button>

            <button className="bg-white border border-slate-200 text-slate-700 px-7 py-3 rounded-2xl font-semibold hover:shadow">
              Explore Offers
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border">
              <Truck className="text-[#00A651]" />
              <p className="font-bold mt-2">Fast Delivery</p>
              <p className="text-sm text-slate-500">Quick doorstep service</p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-sm border">
              <ShieldCheck className="text-[#FF6B00]" />
              <p className="font-bold mt-2">Fresh Quality</p>
              <p className="text-sm text-slate-500">Verified products</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 border border-slate-100">
            <div className="bg-gradient-to-br from-[#EAF8F0] to-[#FFF1E8] rounded-[1.5rem] h-[360px] flex items-center justify-center text-8xl">
              🛒🥦🍎🥩
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="bg-[#EAF8F0] rounded-2xl p-4 text-center font-semibold text-[#00A651]">
                Grocery
              </div>
              <div className="bg-[#FFF1E8] rounded-2xl p-4 text-center font-semibold text-[#FF6B00]">
                Offers
              </div>
              <div className="bg-slate-100 rounded-2xl p-4 text-center font-semibold text-slate-700">
                Fresh
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}