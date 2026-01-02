import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("siteName")}</h1>
      <p>{t("tagline")}</p>
      <p>{t("freeTill")}</p>
    </div>
  );
}

export default HomePage;
