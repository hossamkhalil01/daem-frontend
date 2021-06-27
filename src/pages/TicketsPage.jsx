import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Loading from "../components/Loading";
import TicketList from "../components/ticket/TicketsList";
import { getTickets } from "../services/ticketsService";
import Paginator from "../components/Paginator";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UpdateTicketsListProvider } from "../contexts/updateTicketsListContext";

export default function TicketsPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [update, setUpdate] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const getAllTickets = async (newPage) => {
    const params = { page: newPage, limit: 3 };
    let res = await getTickets(params);
    if (res.data.data.docs.length === 0 && newPage > 1) {
      params.page = newPage - 1;
      res = await getTickets(params);
    }
    setTickets(res.data.data.docs);
    setPagination({
      page: res.data.data.page,
      totalPages: res.data.data.totalPages,
    });
    setLoading(false);
  };

  const onPageChange = async (newPage) => {
    await getAllTickets(newPage);
  };

  useEffect(() => {
    getAllTickets(pagination.page);
  }, [update]);

  return (
    <>
      <Navbar />
      <UpdateTicketsListProvider value={{ update, setUpdate }}>
        {loading ? (
          <Loading />
        ) : tickets.length > 0 ? (
          <>
            <TicketList tickets={tickets} />
            {/* Paginator */}
            <div className="row justify-content-center">
              <div className="w-auto mt-1 mb-5">
                <Paginator
                  paginationInfo={{
                    totalPages: pagination.totalPages,
                    page: pagination.page,
                  }}
                  onPageChange={onPageChange}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center m-5 alert alert-info">
            <h2>No tickets yet</h2>
            <p>
              <Link to="/">
                <ArrowBackIcon /> Back to home
              </Link>
            </p>
          </div>
        )}
      </UpdateTicketsListProvider>

      <Footer />
    </>
  );
}
