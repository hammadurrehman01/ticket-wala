import React,{useState, useEffect} from "react";
import * as scheduleActions from "./../../../../store/Schedule/action";
import { useSelector } from "react-redux";
import TableListingComp from "../../../../components/Common/TableListing";
import { Api } from "common/Api";

const ScheduleListing = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  // REDUX STATE
  const scheduleData = useSelector((state) => state.Schedule.schedules);
  const pagingInfo = useSelector((state) => state.Schedule.pagingInfo);

  const companyId = props.location?.state?.companyId

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

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
      param={companyId}
      isLoading={isLoading}
      activeTab="2"
      companySpecific={true}
      data={scheduleData}
      pagingInfo={pagingInfo}
      deleteAction={scheduleActions.deleteSchedule}
      pageTitle={"Schedules"}
      buttonText="Add New Schedule"
      Link={"./schedule"}
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
        { title: "No Of Days", field: "NoOfDays" },
      ]}
    />

  );
};

export default ScheduleListing;
