import React from "react";
import * as companyAction from '../../../store/Company/action'
import { useSelector } from "react-redux";
import TableListingComp from '../../../components/Common/TableListing'


const AllCompanies = (props) => {
  const pagingInfo = useSelector((state) => state.Company.companyPagingInfo);
  const companiesData = useSelector((state) => state.Company.company);

  return (
        <TableListingComp
        fetchData={companyAction.fetchAllCompanies}
        history={props.history}
        data={companiesData}
        pagingInfo={pagingInfo}
        noDelete={true}
        pageTitle={'Companies'}
        buttonText='Add New Company'
        Link={"./companies"}
        editable={true}
        isDropdown={false}
        column={[
          { title: "Code", field: "Code" },
          { title: "Name", field: "Name" },
          { title: "Email", field: "Email" },
          { title: "Phone No", field: "PhoneNo" },
          { title: "Operating From", field: "OperatingFrom" },
          { title: "Address", field: "Address" },
          { title: "Created On", field: "CreatedOn" },
        ]}
        />
    );
  }

export default AllCompanies;
