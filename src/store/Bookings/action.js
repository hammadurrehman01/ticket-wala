export const FETCH_BOOKINGS = 'FETCH_BOOKINGS'
export const FETCH_ORDERS = 'FETCH_ORDERS'

// Api Link Import
import { Api } from "./../../common/Api";

// demo Login starts here
export const fetchAllBookings = (companyId,pageSize, pageIndex, search, dropdownData, isCompany) => {
    return async (dispatch, getState) => {
      let Link = `${Api}order/all-orders?PageSize=${pageSize}&PageIndex=${pageIndex}&companyId=${isCompany}`
    //   if(search !== null) {
    //     Link = Link + `&searchBusName=${search}`
    //   }
    //   if(pageSize === undefined) {
    //     Link = `${Api}bus/all-buses/${companyId}`
    //   }
  
      const response = await fetch(Link, {
        method: "GET",
      });
  
      const resData = await response.json();

  
      // console.log(resData.success);
      if (resData.success === false) {
        throw new Error(resData.message);
      }
  
      dispatch({
        type: FETCH_BOOKINGS,
        Booking: resData,
      });
    };
  };

// FETCH ALL ORDERS
export const fetchAllOrders = (companyId,pageSize, pageIndex, search, dropdownData, isCompany,secondDropdownValue, maxFilterOneValue,maxFilterTwoValue,maxFilterThreeValue,maxFilterFourValue,endDate) => {
  return async (dispatch, getState) => {
    let Link = `${Api}order/all-orders?PageSize=${pageSize}&PageIndex=${pageIndex === 1 ? 0 : pageIndex}&companyId=${companyId}`
    if(search !== null) {
      Link = Link + `&StartDate=${search}`
    }
    if(endDate !== "") {
      Link = Link + `&EndDate=${endDate}`
    }
    if(maxFilterOneValue !== "") {
      Link = Link + `&PaymentMethodSystemName=${maxFilterOneValue}`
    }
    if(maxFilterTwoValue !== "") {
      Link = Link + `&BillingEmail=${maxFilterTwoValue}`
    }
    if(maxFilterThreeValue !== "") {
      Link = Link + `&BillingPhone=${maxFilterThreeValue}`
    }
    if(maxFilterFourValue !== "") {
      Link = Link + `&BillingLastName=${maxFilterFourValue}`
    }
    if(dropdownData !== 0) {
      Link = Link + `&scheduleId=${dropdownData}`
    }

    console.log(Link)

    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();
    console.log(resData)


    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_ORDERS,
      Orders: resData,
    });
  };
};


// Add AND DELETE Handler
export const orderPostHanlder = (Link) => {
  return async () => {
    try {
      const response = await fetch(`${Api}${Link}`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log(resData2)
      if (!resData2.success) {
        throw new Error(resData2.message);
      }else {
        return resData2
      }

    } catch (error) {
      throw error;
    }
  };
};