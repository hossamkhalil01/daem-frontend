import { useEffect, useState } from "react";
import Paginator from "../../components/Paginator";
import PageHeaders from "../../components/PageHeaders";
import { getApplications } from "../../services/doctorApplicationsService";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../../utils/pagination";
import ApplicationsTable from "../../components/ApplicationsTable";
import { useTranslation } from "react-i18next";

const ApplicationsPage = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [applications, setApplciations] = useState([]);

  const handlePageChange = async (newPage = 1) => {
    // construct the params
    const params = createPaginationParams(
      {},
      {
        ...pagination,
        page: newPage,
        limit: 8,
      }
    );

    // get the new page from api
    try {
      const res = await getApplications(params);
      const { data, paginationInfo } = parsePaginatedResponse(res);
      // set the values
      setPagination(paginationInfo);
      setApplciations(data);
    } catch (err) {
      handleApplicationsError(err);
    }
  };

  const handleApplicationsError = (err) => {
    console.log(err);
  };

  useEffect(() => {
    handlePageChange();
  }, []);

  return (
    <>
      <PageHeaders pageTitle={`${t("dashboard")} (${t("doctors-apps")})`} />
      <div>
        <div className="row mt-5 container-fluid justify-content-center main-content">
          <div className="col-8">
            <ApplicationsTable applications={applications} />
            <div className="row justify-content-end">
              <div className="w-auto mt-4">
                <Paginator
                  size="medium"
                  paginationInfo={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationsPage;
