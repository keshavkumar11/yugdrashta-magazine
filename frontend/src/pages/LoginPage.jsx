import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("login")}</h2>
      <p>ઈમેલ અને પાસવર્ડથી લૉગિન કરો</p>
    </div>
  );
}

export default LoginPage;
