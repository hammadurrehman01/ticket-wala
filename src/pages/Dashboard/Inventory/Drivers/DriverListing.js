import React from "react";
import * as bussAction from '../../../../store/Buss/action'
import { useSelector } from "react-redux";
import TableListingComp from '../../../../components/Common/TableListing'


const DriverListing = (props) => {
  const pagingInfo = useSelector((state) => state.Bus.driverPagingInfo);
  const drivers = useSelector((state) => state.Bus.driverListing);

  const companyId = props.location?.state?.companyId

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

  if(Id === 0  && companyId === undefined) {
    props.history.push('/companies')
  }

  return (
        <TableListingComp
        fetchData={bussAction.fetchAllBusDrivers}
        history={props.history}
        data={drivers}
        activeTab="4"
        param={companyId}
        companySpecific={true}
        pagingInfo={pagingInfo}
        deleteAction={bussAction.deleteDriver}
        pageTitle={'Drivers'}
        buttonText='Add New Driver'
        Link={"./drivers"}
        isDropdown={false}
        column={[
          { title: "Name", field: "Name" },
          { title: "Phone No", field: "PhoneNo" },
          { title: "Address", field: "Address" },
        ]}
        />
    );
  }

export default DriverListing;
