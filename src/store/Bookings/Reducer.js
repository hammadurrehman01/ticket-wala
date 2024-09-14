import {
    FETCH_BOOKINGS,
    FETCH_ORDERS
  } from "./action";
  
  
  const initialState = {
    bookings: [],
    bookingPagingInfo:{},
    orders: [],
    ordersPagingInfo:{},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOKINGS:
        return {
          ...state,
          bookings: action.Booking.data,
          bookingPagingInfo: action.Booking.pagingInfo
        };

        case FETCH_ORDERS:
          return {
            ...state,
            orders: action.Orders.data,
            ordersPagingInfo: action.Orders.pagingInfo
          };
    }
    return state;
  };
  