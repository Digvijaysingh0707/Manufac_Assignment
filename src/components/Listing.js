const Listing = ({ coloumns, listingData }) => {
  return (
    <table>
      <thead>
        <tr>
          {coloumns && coloumns.map((item, i) => <th key={i}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {listingData &&
          listingData.map((item, i) => (
            <tr key={i}>
              <td>{item.year || item?.cropName}</td>
              <td>{item.maxProduction || item?.averageYield}</td>
              <td>{item.minProduction || item?.averageArea}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Listing;
