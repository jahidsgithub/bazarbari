import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@bazarbari.com",
    password: "123456",
  });

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", form);

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4">
      <form onSubmit={login} className="bg-white w-full max-w-md rounded-2xl border shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-[#0aad0a]">
          Bazar<span className="text-[#ff7a00]">Bari</span>
        </h1>

        <p className="text-center text-slate-500 mt-1 mb-8">Admin Login</p>

        <label className="font-semibold">Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 outline-none focus:border-[#0aad0a]"
        />

        <label className="font-semibold">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border rounded-lg px-4 py-3 mt-2 mb-6 outline-none focus:border-[#0aad0a]"
        />

        <button className="w-full bg-[#0aad0a] hover:bg-[#087f23] text-white py-3 rounded-lg font-bold">
          Login
        </button>
      </form>
    </div>
  );
}