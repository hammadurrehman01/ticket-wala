export const FETCH_COMPANY = "FETCH_COMPANY";

// Api Link Import
import { Api } from "./../../common/Api";

// demo Login starts here
export const fetchAllCompanies = (companyId,pageSize, pageIndex, search) => {
  return async (dispatch, getState) => {
    let Link = `${Api}company/all-companies?PageSize=${pageSize}&PageIndex=${pageIndex}`
    if(search !== null) {
      Link = Link + `&company=${search}`
    }
    if(pageSize === undefined) {
      Link = `${Api}company/all-companies`
    }

    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();

    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_COMPANY,
      Company: resData,
    });
  };
};


