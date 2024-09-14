import React from "react";
import { TerminalActions,CommonAction } from "../../../store/actions";
import { useSelector } from "react-redux";
import TableListingComp from '../../../components/Common/TableListing'


const Terminal = (props) => {
  const pagingInfo = useSelector((state) => state.Terminal.pagingInfo);
  const terminals = useSelector((state) => state.Terminal.terminals);

  // COUNTRIES 
  const countries = useSelector(state => state.Common.countries)

  return (
        <TableListingComp
        fetchData={TerminalActions.fetchAllTerminal}
        fetchDropDownData={CommonAction.fetchCountries()}
        deleteAction={TerminalActions.deleteTerminal()}
        dropdownData={countries}
        history={props.history}
        data={terminals}
        editable={true}
        pagingInfo={pagingInfo}
        deleteAction={TerminalActions.deleteTerminal}
        pageTitle={'Terminals'}
        buttonText='Add New Terminal'
        Link={"./terminal"}
        dropDownLabel='Cities'
        isDropdown={true}
        column={[
          { title: "Name", field: "Name" },
          { title: "City Name", field: "CityName" },
        ]}
        />
    );
  }

export default Terminal;
