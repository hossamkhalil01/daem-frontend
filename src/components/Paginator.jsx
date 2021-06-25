import React from 'react';
import Pagination from '@material-ui/lab/Pagination';


const Paginator = ({ paginationInfo: { totalPages, page }, onPageChange }) => {
    const handleChangePage = (event, newPage) => {
        if (newPage !== page) onPageChange(newPage);
    }

    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
        />
    );
};

export default Paginator;