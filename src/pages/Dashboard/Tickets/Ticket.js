import React from "react";
import * as companyActions from '../../../store/Company/action'
import * as ticketActions from '../../../store/Tickets/action'
import * as bussAction from '../../../store/Buss/action'
import { useSelector } from "react-redux";
import TableListingComp from '../../../components/Common/TableListing'


const BussListing = (props) => {
  const pagingInfo = useSelector((state) => state.Tickets.pagingInfo);
  const ticketsData = useSelector((state) => state.Tickets.tickets);
  console.log(ticketsData)

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}
  console.log(Id)

  // COUNTRIES 
  const departureData = useSelector(state => state.Tickets.departure)
  console.log(departureData)
  const arrivalData = useSelector(state => state.Tickets.arrival)
  console.log(arrivalData)


  return (
        <TableListingComp
        fetchData={ticketActions.fetchAllTickets}
        fetchDropDownData={ticketActions.fetchAllDeparture()}
        fetchDropdownTwo={ticketActions.fetchAllArrival()}
        dropdownData={departureData}
        dropdownTwoData={arrivalData}
        dropdownTwo={true}
        noAll={true}
        dateSearch={true}
        noPaging
        buttonText={null}
        noDelete
        history={props.history}
        data={ticketsData}
        pagingInfo={pagingInfo}
        deleteAction={bussAction.deleteBus}
        pageTitle={'Tickets'}
        Link={"./404"}
        dropDownLabel='Buss Category'
        isDropdown={true}
        column={[
          { title: "Company", field: "CompanyName" },
          { title: "Terminal From", field: "TerminalFrom" },
          { title: "Terminal To", field: "TerminalTo" },
          { title: "Price", field: "Price" },
          { title: "Seats Left", field: "SeatsLeft" },
          { title: "TripDate", field: "TripDate" },
        ]}
        />
    );
  }

export default BussListing;
