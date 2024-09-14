import React from "react";
import * as bussAction from '../../../store/Buss/action'
import { useSelector } from "react-redux";
import TableListingComp from '../../../components/Common/TableListing'


const BusCategoriesListing = (props) => {
  const pagingInfo = useSelector((state) => state.Bus.bussCategoriesPagingInfo);
  const bussCategories = useSelector(state => state.Bus.bussCategories)

  const companyId = props.location?.state?.companyId

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

  if(Id === 0  && companyId === undefined) {
    props.history.push('/companies')
  }


  return (
        <TableListingComp
        fetchData={bussAction.fetchAllBussCategories}
        history={props.history}
        data={bussCategories}
        param={companyId}
        activeTab="5"
        companySpecific={true}
        pagingInfo={pagingInfo}
        deleteAction={bussAction.deleteBusCat}
        pageTitle={'Bus Category'}
        buttonText='Add New Bus Categry' 
        Link={"./BusCategory"}
        isDropdown={false}
        column={[
          { title: "Name", field: "Name" },
          { title: "Capacity", field: "Capacity" },
          { title: "Rows", field: "Rows" },
          { title: "Columns", field: "Columns" },
        ]}
        />
    );
  }

export default BusCategoriesListing;
