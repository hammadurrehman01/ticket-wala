import React from "react";
import * as bussAction from '../../../store/Buss/action'
import { useSelector } from "react-redux";
import TableListingComp from '../../../components/Common/TableListing'


const BussListing = (props) => {
  const pagingInfo = useSelector((state) => state.Bus.bussPagingInfo);
  const buses = useSelector((state) => state.Bus.bussListing);

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

  // COUNTRIES 
  const bussCategories = useSelector(state => state.Bus.bussCategories)


  return (
        <TableListingComp
        fetchData={bussAction.fetchAllBuses}
        fetchDropDownData={bussAction.fetchAllBussCategories(Id)}
        dropdownData={bussCategories}
        history={props.history}
        data={buses}
        pagingInfo={pagingInfo}
        deleteAction={bussAction.deleteBus}
        pageTitle={'Bus'}
        buttonText='Add New Bus'
        Link={"./Bus"}
        dropDownLabel='Buss Category'
        isDropdown={true}
        column={[
          { title: "Name", field: "Name" },
          { title: "Bus Category", field: "BusCategoryName" },
          { title: "Reg No", field: "RegNo" },
          { title: "Model", field: "Model" },
        ]}
        />
    );
  }

export default BussListing;
