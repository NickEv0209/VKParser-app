import { Pagination } from "@mui/material";

import './Pagination.css'

interface PaginateProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="paginate">
      <Pagination
        key={currentPage}
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
      />
    </div>
  )
}

export default Paginate;
