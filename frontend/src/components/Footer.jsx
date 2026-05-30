export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0aad0a]">
            Bazar<span className="text-[#ff7a00]">Bari</span>
          </h2>
          <p className="mt-4 text-slate-600">
            Bazar Bari is an e-commerce platform dedicated to providing safe and reliable food to every home.
          </p>
          <p className="mt-4 text-slate-600">Rampura, Dhaka, Bangladesh</p>
          <p className="text-slate-600">09642-922922</p>
          <p className="text-slate-600">contact@bazarbari.com</p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Information</h3>
          <ul className="space-y-2 text-slate-600">
            <li>About us</li>
            <li>Contact us</li>
            <li>Company Information</li>
            <li>Bazar Bari Stories</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Shop By</h3>
          <ul className="space-y-2 text-slate-600">
            <li>Oil & Ghee</li>
            <li>Honey</li>
            <li>Dates</li>
            <li>Spices</li>
            <li>Nuts & Seeds</li>
            <li>Beverage</li>
            <li>Functional Foods</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-slate-600">
            <li>Support Center</li>
            <li>How to Order</li>
            <li>Order Tracking</li>
            <li>Payment</li>
            <li>Shipping</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-slate-500">
        Copyright © 2026 BazarBari Developed by Sania Air International
      </div>
    </footer>
  );
}