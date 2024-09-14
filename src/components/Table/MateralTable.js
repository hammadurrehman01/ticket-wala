import React from 'react'
import MaterialTable from "material-table";
import { tableIcons } from "../../assets/Icon/MaterialUiIcon";

const MaterialTableComp = (props) =>{

  // LOGIN USER ID
  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

    return (
      <React.Fragment>
        {props.isLoading ? (
          <div
          className="spinner-border text-success m-1"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        ) : (
          <MaterialTable
        isLoading={props.isLoading}
        icons={tableIcons}
        title={null}
        columns={props.columns}
        data={(query) =>
          new Promise((resolve, reject) => {
            // prepare your data and then call resolve like this:
            resolve({
              data: props.routeData, // your data array
              page: props.noPaging ? 0 : props.PageIndex, // current page number
              totalCount: props.noPaging ? props.routeData?.length : props.TotalCount, // total row number
            });
          })
        }
        // onSearchChange={(e) => console.log(e)}
        onChangePage={(e) => props.fetchRouteHandler(5, e + 1)}
        onSearchChange={(e) => console.log(e)}
        onQueryChange={(e) => console.log(e)}
        onOrderChange={(e, d) => console.log(e, d)}
        options={{
          search: false,
          pageSizeOptions:[],
          showTitle: false,
          pageSize: props.noPaging ? props.routeData?.length : 10
        }}
        actions={Id === 0 && !props.editable ? null :[

          props.noDelete ? null : (rowData) => ({
            icon: tableIcons.Delete,
            tooltip: "Delete",
            onClick: (event, rowData) =>
              props.deleteRouteHandler(rowData),
          }),
          (rowData) => ({
            icon: tableIcons.Edit,
            tooltip: "Edit",
            onClick: (event, rowData) => {
                if(props.Popup) {
                    props.EditHandler(rowData)
                }else{
                    props.history.push(`${props.Link}/${rowData.Id}`, {
                        route: rowData,
                      })
                }
            }
           
         
          }),
        ]}
      />
        )
         }
        
      </React.Fragment>
    )
}

export default MaterialTableComp