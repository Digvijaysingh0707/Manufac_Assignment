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
      const maxCropName = item["Crop Name"];
      const minCropName = item["Crop Name"];

      // Skip entries without production data
      if (production === "") return;

      // Initialize year entry if it doesn't exist
      if (!result[year]) {
        result[year] = {
          year,
          maxProduction: production,
          minProduction: production,
          maxCropName,
          minCropName,
        };
      } else if (production != "") {
        // Update max and min production

        if (production > result[year].maxProduction) {
          result[year] = {
            ...result[year],
            maxProduction: production,
            maxCropName,
          };
        }

        if (production < result[year].maxProduction) {
          result[year] = {
            ...result[year],
            minProduction: production,
            minCropName,
          };
        }
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
