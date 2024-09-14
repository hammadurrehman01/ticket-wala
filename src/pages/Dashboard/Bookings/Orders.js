import React from "react";
import * as scheduleActions from '../../../store/Schedule/action'
import * as bookingActions from '../../../store/Bookings/action'
import * as bussAction from '../../../store/Buss/action'
import { useSelector } from "react-redux";
import TableListingComp from '../../../components/Common/TableListing'


const Orders = (props) => {
  const pagingInfo = useSelector((state) => state.Booking.ordersPagingInfo);
  const ordersData = useSelector((state) => state.Booking.orders);
  console.log(ordersData)

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}
  console.log(Id)

  // COUNTRIES 
  const scheduleData = useSelector(state => state.Schedule.schedules)
  console.log(scheduleData)

  return (
        <TableListingComp
        fetchData={bookingActions.fetchAllOrders}
        fetchDropDownData={scheduleActions.fetchAllSchedule(Id)}
        dropdownData={scheduleData}
        endDate={true}
        dateSearch={true}
        buttonText={null}
        noDelete
        history={props.history}
        data={ordersData}
        pagingInfo={pagingInfo}
        deleteAction={bussAction.deleteBus}
        pageTitle={'Orders'}
        editable
        Link={"./orders"}
        dropDownLabel='Buss Category'
        isDropdown={true}
        maxFilter={true}
        maxFilterInputOne='Payment Method Name'
        maxFilterInputTwo='Billing Email'
        maxFilterInputThree='Billing Phone'
        maxFilterInputFour='Billing Last Name'
        column={[
          { title: "Order #", field: "CustomOrderNumber" },
          { title: "Email", field: "CustomerEmail" },
          { title: "Order Status", field: "OrderStatus" },
          { title: "Order Total", field: "OrderTotal" },
          { title: "Payment Status", field: "PaymentStatus" },
        ]}
        />
    );
  }

export default Orders;
