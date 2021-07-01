import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Filter } from "../components/Filter";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Loading from "../components/Loading";
import Paginator from "../components/Paginator";
import TicketList from "../components/ticket/TicketsList";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { UpdateTicketsListProvider } from "../contexts/updateTicketsListContext";
import { getTickets } from "../services/ticketsService";

export default function TicketsPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [update, setUpdate] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filter, setFilter] = useState({
    from: "",
    to: "",
    state: "",
  });
  const [onUpdateFilteredState, setOnUpdateFilteredState] = useState(false);
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();

  const getAllTickets = async (newPage, filterProps) => {
    const params = { page: newPage, limit: 3, ...filterProps };
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
    const newFilter = {};
    for (const prop in filter) {
      if (filter[prop] === "") {
        newFilter[prop] = null;
      } else {
        newFilter[prop] = filter[prop];
      }
    }
    getAllTickets(pagination.page, newFilter);
  }, [update, onUpdateFilteredState]);

  return (
    <>
      <Navbar />
      {!currentUser || currentUser.role === "user" ? (
        <div className="d-flex">
          <NavLink
            to="/tickets/new"
            exact
            className="m-auto btn btn-main-2 btn-icon btn-round-full"
          >
            {t("ask-doctor")} <i className="icofont-simple-right ml-2  "></i>
          </NavLink>
        </div>
      ) : (
        ""
      )}
      <div className="m-5">
        <Filter
          filter={filter}
          setFilter={setFilter}
          onUpdateFilteredState={setOnUpdateFilteredState}
        />
      </div>
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
            <h2>{t("no-tickets")}</h2>
            <p>
              <Link to="/">
                <ArrowBackIcon />
                {t("back-to-home")}
              </Link>
            </p>
          </div>
        )}
      </UpdateTicketsListProvider>

      <Footer />
    </>
  );
}
