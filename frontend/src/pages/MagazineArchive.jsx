import { useEffect, useState } from "react";
import api from "../api/axios";
import { useTranslation } from "react-i18next";

function MagazineArchive() {
  const [magazines, setMagazines] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    api.get("/magazines")
      .then(res => setMagazines(res.data))
      .catch(err => console.error(err));
  }, []);


const handleDownload = async (id) => {
  try {
    const res = await api.get(`/magazines/${id}/download`);
    window.open(res.data.pdfUrl, "_blank");
  } catch (err) {
    alert(err.response?.data?.message || "ડાઉનલોડ નિષ્ફળ");
  }
};

  return (
    <div>
      <h2>{t("download")}</h2>

      {magazines.map(mag => (
        <div key={mag._id}>
          <h3>{mag.title}</h3>
          <p>{mag.editionMonth}</p>

         <button onClick={() => handleDownload(mag._id)}>
  ડાઉનલોડ કરો
</button>
        </div>
      ))}
    </div>
  );
}

export default MagazineArchive;
