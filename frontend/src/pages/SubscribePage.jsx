import { useTranslation } from "react-i18next";

function SubscribePage() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("subscribe")}</h2>
      <p>યુગદ્રષ્ટા માટે સબ્સ્ક્રિપ્શન પ્લાન પસંદ કરો</p>
    </div>
  );
}

export default SubscribePage;
