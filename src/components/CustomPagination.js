import { useEffect } from "react";

const CustomPagination = ({
  pageNo,
  setPagination,
  itemPerPage,
  listingData,
  setPaginatedData,
}) => {
  const handlePaginatedData = (data) => {
    let currPageData = data?.slice(
      pageNo * itemPerPage,
      (pageNo + 1) * itemPerPage
    );
    setPaginatedData(currPageData);
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

  console.log(pageNo, "PAGENO");

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={handlePreviousPage}
      >
        {"<"}
      </button>
      <p className="pagination-number">{pageNo + 1}</p>
      <button className="pagination-button" onClick={handleNextPage}>
        {">"}
      </button>
    </div>
  );
};

export default CustomPagination;
