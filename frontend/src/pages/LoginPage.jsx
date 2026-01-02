import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      alert("લૉગિન નિષ્ફળ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t("login")}</h2>

      <input
        type="email"
        placeholder="ઈમેલ"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="પાસવર્ડ"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">{t("login")}</button>
    </form>
  );
}

export default LoginPage;
