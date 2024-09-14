import React, { useEffect, useState } from "react";
import * as scheduleActions from "./../../../../store/Schedule/action";
import { useSelector } from "react-redux";
import TableListingComp from "../../../../components/Common/TableListing";
import { Api } from "common/Api";

const AllTrips = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  // REDUX STATE
  const scheduleData = useSelector((state) => state.Schedule.schedules);
  const pagingInfo = useSelector((state) => state.Schedule.pagingInfo);
  console.log(scheduleData);

  const companyId = props.location?.state?.companyId
  console.log(props)

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}
  console.log(Id)

  if(Id === 0  && companyId === undefined) {
    props.history.push('/companies')
  }

  // SET DATA AND TIME FORMATS
  useEffect(()=>{
    const companyIdSetHandler = async() => {
      setIsLoading(true)
      try {
        const response = await fetch(`${Api}company/company/${Id}`, {
          method: "GET",
        });
        const resData = await response.json();
        console.log(resData)
  
      const changeData = scheduleData;
      for (let key in changeData) {
        changeData[key].StartDate = changeData[key].StartDate?.slice(0,10)
        changeData[key].EndFrom = changeData[key].EndFrom?.slice(0,10)
        changeData[key].ArrivalTime = changeData[key].ArrivalTime?.slice(11)
        changeData[key].DepartureTime = changeData[key].DepartureTime?.slice(11)
        changeData[key].TripId = resData.data.Code +"-"+changeData[key].Id
      }
       setIsLoading(false)
  
      } catch (e) {
        console.log("Fetch Scheduel Data", e);
        setIsLoading(false)
      }
    }
    companyIdSetHandler()
},[scheduleData])


  return (
    <TableListingComp
      fetchData={scheduleActions.fetchAllSchedule}
      fetchDropdownData={null}
      history={props.history}
      isLoading={isLoading}
      activeTab="3"
      param={companyId}
      companySpecific={true}
      data={scheduleData}
      pagingInfo={pagingInfo}
      deleteAction={scheduleActions.deleteSchedule}
      pageTitle={"Trips"}
      buttonText={null}
      Link={"./trips"}
      noDelete={true}
      column={[
        { title: "Trip ID", field: `TripId` },
        { title: "Name", field: "Name" },
        { title: "Departure Time", field: "DepartureTime" },
        {
          title: "Arrival Time",
          field: "ArrivalTime",
        },
        { title: "Start Date", field: "StartDate" },
        { title: "End From", field: "EndFrom" },
        {
            field: 'TripPlannerCreated',
            title: 'Trip Created',
            render: rowData => <img src={rowData.TripPlannerCreated ? 'data:image/png;base64,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' : 'https://i.dlpng.com/static/png/7035551_preview.png'} style={{width: 20, borderRadius: '50%'}}/>
          },
      ]}
    />
  );
};

export default AllTrips;
