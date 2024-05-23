import { useEffect, useState } from "react";
import { agriData } from "../constants/agriData";
import Listing from "./Listing";
import { Average_Coloumn } from "../constants/constants";

const AverageData = () => {
  const [listingData, setListingData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [pageNo, setPagination] = useState(0);
  const [itemPerPage] = useState(10);

  const processData = (data) => {
    const result = {};

    data.forEach((item) => {
      const cropName = item["Crop Name"];
      const yieldOfCrops =
        parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
      const areaUnderCultivation =
        parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;

      if (!result[cropName]) {
        result[cropName] = {
          cropName,
          totalYield: 0,
          totalArea: 0,
          count: 0,
        };
      }

      result[cropName].totalYield += yieldOfCrops;
      result[cropName].totalArea += areaUnderCultivation;
      result[cropName].count += 1;
    });

    return Object.values(result).map((item) => ({
      cropName: item.cropName,
      averageYield: item.totalYield / item.count,
      averageArea: item.totalArea / item.count,
    }));
  };

  const handlePaginatedData = () => {
    let dataCopy = listingData;
    let currPageData = dataCopy.slice(
      pageNo * itemPerPage,
      (pageNo + 1) * itemPerPage
    );
    setPaginatedData(currPageData);
  };

  const handlePreviousPage = () => {
    setPagination((page) => page - 1);
  };

  const handleNextPage = () => {
    setPagination((page) => page + 1);
  };

  useEffect(() => {
    const data = processData(agriData);
    setListingData(data);
    setPaginatedData(data?.slice(0, 10));
  }, []);

  useEffect(() => {
    if (listingData?.length > 0) handlePaginatedData();
  }, [pageNo]);

  return (
    <>
      <Listing coloumns={Average_Coloumn} listingData={paginatedData} />
      <button onClick={handlePreviousPage}>{"<"}</button>
      <p>{pageNo + 1}</p>
      <button onClick={handleNextPage}>{">"}</button>
    </>
  );
};

export default AverageData;
