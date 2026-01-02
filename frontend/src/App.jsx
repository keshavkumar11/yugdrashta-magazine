import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("siteName")}</h1>
      <p>{t("tagline")}</p>
      <button>{t("subscribe")}</button>
      <p>{t("freeTill")}</p>
    </div>
  );
}

export default App;
