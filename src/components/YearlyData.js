import { useEffect, useState } from "react";
import { agriData } from "../constants/agriData";
import Listing from "./Listing";
import { Yearly_Table_Coloumn } from "../constants/constants";
import CustomPagination from "./CustomPagination";

const YearlyData = () => {
  const [listingData, setListingData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [pageNo, setPagination] = useState(0);
  const [itemPerPage] = useState(10);
  const processData = (data) => {
    const result = {};

    data.forEach((item) => {
      // Extract the numerical year from the Year string
      const yearMatch = item.Year.match(/\d{4}/);
      if (!yearMatch) return; // Skip if no valid year found
      const year = parseInt(yearMatch[0], 10);

      const production = item["Crop Production (UOM:t(Tonnes))"];

      // Skip entries without production data
      if (production === "") return;

      // Initialize year entry if it doesn't exist
      if (!result[year]) {
        result[year] = {
          year,
          maxProduction: production,
          minProduction: production,
        };
      } else {
        // Update max and min production
        result[year].maxProduction = Math.max(
          result[year].maxProduction,
          production
        );
        result[year].minProduction = Math.min(
          result[year].minProduction,
          production
        );
      }
    });

    return Object.values(result);
  };

  useEffect(() => {
    const data = processData(agriData);
    setListingData(data);
    setPaginatedData(data?.slice(0, 10));
  }, []);

  return (
    <>
      <Listing coloumns={Yearly_Table_Coloumn} listingData={paginatedData} />
      <CustomPagination
        pageNo={pageNo}
        setPagination={setPagination}
        itemPerPage={itemPerPage}
        listingData={listingData}
        setPaginatedData={setPaginatedData}
      />
    </>
  );
};

export default YearlyData;
