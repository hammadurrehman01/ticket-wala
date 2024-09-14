import React from "react";
import * as bussAction from '../../../../store/Buss/action'
import { useSelector } from "react-redux";
import TableListingComp from '../../../../components/Common/TableListing'


const BusCategoriesTypeListing = (props) => {
  const pagingInfo = useSelector((state) => state.Bus.bussCategoriesPagingInfo);
  const bussCategories = useSelector(state => state.Bus.bussCategories)


  return (
        <TableListingComp
        fetchData={bussAction.fetchAllBussCategories}
        history={props.history}
        data={bussCategories}
        pagingInfo={pagingInfo}
        deleteAction={bussAction.deleteBusCat}
        pageTitle={'Bus'}
        buttonText='Add New Bus'
        Link={"./Bus"}
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

export default BusCategoriesTypeListing;
