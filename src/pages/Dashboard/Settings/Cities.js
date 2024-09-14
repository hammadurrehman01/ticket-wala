import React from "react";
import { TerminalActions,CommonAction } from "../../../store/actions";
import { useSelector } from "react-redux";
import TableListingComp from '../../../components/Common/TableListing'


const Cities = (props) => {
  const pagingInfo = useSelector((state) => state.Terminal.pagingInfo);
  const terminals = useSelector((state) => state.Terminal.terminals);

  // COUNTRIES 
  const countries = useSelector(state => state.Common.countries)
  console.log(countries)

  return (
        <TableListingComp
        fetchData={CommonAction.fetchCountries}
        deleteAction={CommonAction.deleteCities()}
        history={props.history}
        data={countries}
        pagingInfo={pagingInfo}
        deleteAction={CommonAction.deleteCities}
        pageTitle={'Cities'}
        editable={true}
        noPaging
        noSearch
        buttonText='Add New City'
        Link={"./Cities"}
        column={[
          { title: "Abbreviation", field: "Abbreviation" },
          { title: "City Name", field: "Name" },
        ]}
        />
    );
  }

export default Cities;
