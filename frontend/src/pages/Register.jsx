import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.password) {
        alert("Please fill in all fields");
        return;
      }
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={e => setForm({...form, name: e.target.value})} />

      <input placeholder="Email"
        onChange={e => setForm({...form, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={e => setForm({...form, password: e.target.value})} />

      <button>Register</button>

      <p><Link to="/">Login</Link></p>
    </form>
  );
}