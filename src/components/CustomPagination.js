import { useEffect, useState } from "react";

const CustomPagination = ({
  pageNo,
  setPagination,
  itemPerPage,
  listingData,
  setPaginatedData,
}) => {
  const [disableNextPage, setDisableNextPage] = useState(false);

  const handlePaginatedData = (data) => {
    let currPageData = data?.slice(
      pageNo * itemPerPage,
      (pageNo + 1) * itemPerPage
    );
    let currPageLength = currPageData?.length;
    setPaginatedData(currPageData);
    setDisableNextPage(currPageLength < itemPerPage);
  };

  const handlePreviousPage = () => {
    setPagination(pageNo - 1);
  };

  const handleNextPage = () => {
    setPagination(pageNo + 1);
  };

  useEffect(() => {
    if (listingData?.length > 0) handlePaginatedData(listingData);
  }, [pageNo]);

  return (
    <div className="pagination">
      <button
        disabled={pageNo === 0}
        className="pagination-button"
        onClick={handlePreviousPage}
      >
        {"<"}
      </button>
      <p className="pagination-number">{pageNo + 1}</p>
      <button
        disabled={disableNextPage}
        className="pagination-button"
        onClick={handleNextPage}
      >
        {">"}
      </button>
    </div>
  );
};

export default CustomPagination;
