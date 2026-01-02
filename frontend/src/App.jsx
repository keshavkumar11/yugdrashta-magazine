import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MagazineArchive from "./pages/MagazineArchive";
import LoginPage from "./pages/LoginPage";
import SubscribePage from "./pages/SubscribePage";
import { useTranslation } from "react-i18next";
import { useAuth } from "./context/AuthContext";
function App() {
  const { t } = useTranslation();
        
const { user, logout } = useAuth();
  return (
    <BrowserRouter>
      <nav>


{user ? (
  <button onClick={logout}>{t("logout")}</button>
) : (
  <Link to="/login">{t("login")}</Link>
)}
        <Link to="/">{t("home")}</Link> |{" "}
        <Link to="/archive">{t("archive")}</Link> |{" "}
        <Link to="/login">{t("login")}</Link> |{" "}
        <Link to="/subscribe">{t("subscribe")}</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/archive" element={<MagazineArchive />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
