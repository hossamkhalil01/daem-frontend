import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTickets } from "../services/ticketsService";
import "../styles/MedicalRecord.css";
import Loading from "./Loading";
import Paginator from "./Paginator";
import RecordCard from "./RecordCard";

export default function MedicalRecord({ userId }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const [records, setRecords] = useState([]);

  const getUserRecords = async (newPage) => {
    const params = { page: newPage, limit: 3, patient: userId };
    const _records = await getTickets(params);
    setRecords(_records.data.data.docs);
    setPagination({
      page: _records.data.data.page,
      totalPages: _records.data.data.totalPages,
    });
    console.log(pagination);
    setLoading(false);
  };

  const onPageChange = async (newPage) => {
    getUserRecords(newPage);
  };

  useEffect(() => {
    getUserRecords();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="medical-record">
      {records.length ? (
        <div>
          <div className="medical-record__records">
            {records.map((record) => (
              <RecordCard ticket={record} />
            ))}
          </div>
          <div className="medical-record__paginator">
            <Paginator
              paginationInfo={{
                totalPages: pagination.totalPages,
                page: pagination.page,
              }}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      ) : (
        <p>{t("no-previous-tickets")}</p>
      )}
    </div>
  );
}
