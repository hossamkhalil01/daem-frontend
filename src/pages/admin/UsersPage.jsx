import { useEffect, useState } from "react";
import Paginator from "../../components/Paginator";
import UsersTable from "../../components/UsersTable";
import { getAllUsers } from "../../services/adminService";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../../utils/pagination";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";

const UsersPage = () => {
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [users, setUsers] = useState([]);

  const handlePageChange = async (newPage = 1, filterObj = {}) => {
    // construct the params
    const params = createPaginationParams(filterObj, {
      ...pagination,
      page: newPage,
      limit: 5,
    });

    // get the new page from api
    try {
      const res = await getAllUsers(params);
      const { data, paginationInfo } = parsePaginatedResponse(res);
      // set the values
      setPagination(paginationInfo);
      setUsers(data);
    } catch (err) {
      handleUserError(err);
    }
  };

  // TODO
  const handleSelectionError = (err) => {
    console.log(err);
  };

  // TODO
  const handleUserError = (err) => {
    console.log(err);
  };

  useEffect(() => {
    handlePageChange();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="row mt-5 container-fluid justify-content-center main-content">
          <div className="col-8">
            <UsersTable users={users} onSelectionError={handleSelectionError} />
            <div className="row justify-content-end">
              <div className="w-auto mt-4">
                <Paginator
                  paginationInfo={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UsersPage;
