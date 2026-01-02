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

  return (
    <div>
      <h2>{t("download")}</h2>

      {magazines.map(mag => (
        <div key={mag._id}>
          <h3>{mag.title}</h3>
          <p>{mag.editionMonth}</p>

          <a
            href={`http://localhost:5000/api/magazines/${mag._id}/download`}
            target="_blank"
            rel="noreferrer"
          >
            {t("download")}
          </a>
        </div>
      ))}
    </div>
  );
}

export default MagazineArchive;
