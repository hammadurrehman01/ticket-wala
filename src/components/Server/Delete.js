import React from 'react'
import {useDispatch} from 'react-redux'

// DELETE ROUTE HANDLER
const Delete = async (props) => {
    const dispatcher = useDispatch()
    try {
      await dispatcher(props.action);
      if (props.data.length === 1 && props.pageIndex > 1) {
        props.setPageIndex(props.pageIndex - 1);
      } else {
        props.fetchHandler();
      }
      setConfirmRoute('Route Deleted Successfully!')
    } catch (err) {
      console.log(err);
      setError(err)
      setIsRouteUpdate(false);
    }
  };

  export default Delete