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
              <td>{item.year}</td>
              <td>{item.maxProduction}</td>
              <td>{item.minProduction}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Listing;
