import React,{useEffect} from "react";
import * as bookingActions from '../../../store/Bookings/action'
import { useSelector } from "react-redux";
import TableListingComp from '../../../components/Common/TableListing'


const Bookings = (props) => {
  const pagingInfo = useSelector((state) => state.Booking.bookingPagingInfo);
  const bookingData = useSelector((state) => state.Booking.bookings);

  //   GET USER MAIN DATA
  const { user } = JSON.parse(localStorage.getItem("authUser"));
  console.log(user);

   // SET DATA AND TIME FORMATS
   useEffect(()=>{
    const changeData = bookingData;
    for (let key in changeData) {
      changeData[key].CreatedOn = changeData[key].CreatedOn?.slice(0,10)
    }
},[bookingData])

  return (
        <TableListingComp
        fetchData={bookingActions.fetchAllBookings}
        companyId={user.companyId}
        history={props.history}
        data={bookingData}
        pagingInfo={pagingInfo}
        noDelete={true}
        pageTitle={'Bookings'}
        buttonText={null}
        Link={"./bookings"}
        isDropdown={false}
        noSearch={true}
        column={[
          { title: "Name", field: "CustomerFullName" },
          { title: "Email", field: "CustomerEmail" },
          { title: "Order Status", field: "OrderStatus" },
          { title: "Payment Status", field: "PaymentStatus" },
          { title: "Order Total", field: "OrderTotal" },
          { title: "Created On", field: "CreatedOn" },
        ]}
        />
    );
  }

export default Bookings;
