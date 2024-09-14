import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  FormGroup,
  Label,
} from "reactstrap";
import Select from "react-select";
import { Link, withRouter } from "react-router-dom"
import { useParams } from "react-router";
import ErrorOrConfirm from '../../../components/UI/ErrorOrConfirm'
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import { Api } from "common/Api";
import { useDispatch } from "react-redux";
import * as orderActions from '../../../store/Bookings/action'


const paymentEnum = [
    {
      options: [
        { label: "Pending", value: "Pending", Id: 10 },
        { label: "Processing", value: "Processing", Id: 20 },
        { label: "Complete", value: "Complete", Id: 30 },
        { label: "Cancelled", value: "Cancelled", Id: 40 },
      ],
    },
  ];

const OrderDetailed = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({})
  const [orderChangeLoading,setOrderChangeLoading] = useState(false)
  const [orderChangeLoadingType, setOrderChangeLoadingType] = useState(0)
  const [error, setError] = useState('')
  const [confirm, setConfirm] = useState('')

  const {id} = useParams()
  const dispatch = useDispatch()

// Handler to fetch data based on querry string
const fetchOrderHandler = async() =>{
  try{
    const response = await fetch(`${Api}order/order/${id}`, {
      method: "GET",
    });
    const resData = await response.json();
    console.log(resData)

    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error(resData.message);
    }else{
     setOrderData(resData.data)
     setIsLoading(false)
    }
  }catch(e){
    console.log('Fetch order Data', e)
    setIsLoading(false)
  }
}

useEffect(()=>{
  if(id !== '0') {
    setIsLoading(true)
    fetchOrderHandler()
  }
},[id])

// CHANGE STATUS HANDLER
const changeOrderStatusChangeHandler = async(Link, type) => {
    try{
        setError('')
        setOrderChangeLoadingType(type)
        setOrderChangeLoading(true)
        const response = await dispatch(orderActions.orderPostHanlder(Link))
        setConfirm(response.message)
        setOrderChangeLoading(false)
        setOrderChangeLoadingType(0)
    }catch(e) {
        setConfirm('')
        setError(e)
        setOrderChangeLoading(false)
        setOrderChangeLoadingType(0)
    }
}
// CHANGE STATUS HANDLER END HERE

  if (isLoading) {
    return (
      <div className="spinner-border text-success m-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
        <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <ErrorOrConfirm error={error} confirmRoute={confirm}/>
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <div className="Order Detail">
                        <h4 className="font-size-16">
                          Order # {orderData.CustomOrderNumber}
                        </h4>
                      </div>

                      <div className="table-responsive">
                        <Table className="table-nowrap">
                          <thead>
                            <tr>
                              <th style={{ width: "70px" }}>No.</th>
                              <th>Item</th>
                              <th className="text-right">Details</th>
                            </tr>
                          </thead>
                          <tbody>

                                <tr>
                                  <td>{'01'}</td>
                                  <td>{'StoreName'}</td>
                                  <td className="text-right">{orderData.StoreName}</td>
                                </tr>

                                <tr>
                                  <td>{'02'}</td>
                                  <td>{'Customer Info'}</td>
                                  <td className="text-right">{orderData.CustomerInfo}</td>
                                </tr>

                                <tr>
                                  <td>{'03'}</td>
                                  <td>{'Customer Full Name'}</td>
                                  <td className="text-right">{orderData.CustomerFullName}</td>
                                </tr>
                                <tr>
                                  <td>{'04'}</td>
                                  <td>{'Order Status'}</td>
                                  <td className="text-right">

                                  <FormGroup className="ajax-select select2-container">
                              <Select
                                onChange={(e)=> changeOrderStatusChangeHandler(`order/change-order-status/${id}?OrderStatusId=${e.Id}`, 1)}
                                isLoading={orderChangeLoading && orderChangeLoadingType === 1}
                                options={paymentEnum}
                                classNamePrefix="select2-selection"
                                defaultValue={{
                                    label: orderData.PaymentStatus,
                                    value: orderData.PaymentStatus,
                                    Id: orderData.PaymentStatusId,
                                  }}  
                              />
                              </FormGroup>
                                  </td>
                                </tr>
                                
                            <tr>
                              <td colSpan="2" className="text-right">
                                Sub Total
                              </td>
                              <td className="text-right">
                                {orderData.OrderSubtotalExclTax}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2" className="border-0 text-right">
                                <strong>Order Shipping</strong>
                              </td>
                              <td className="border-0 text-right">
                                {orderData.OrderShippingExclTax}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2" className="border-0 text-right">
                                <strong>Total</strong>
                              </td>
                              <td className="border-0 text-right">
                                <h4 className="m-0">
                                  {orderData.OrderSubtotalExclTax}
                                </h4>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="d-print-none">
                        <div className="float-right">
                          <Link
                            to="#"
                            onClick={()=> changeOrderStatusChangeHandler(`order/mark-order-as-paid/${id}`, 2)}
                            className="btn btn-success waves-effect waves-light mr-2"
                          >
                             {`${orderChangeLoading && orderChangeLoadingType === 2 ? 'Loading...' : 'Mark Paid'}`}
                          </Link>
                          <Link
                        
                        onClick={()=> changeOrderStatusChangeHandler(`order/cancel-order/${id}`, 3)}
                            to="#"
                            className="btn btn-primary w-md waves-effect waves-light"
                          >
                            {`${orderChangeLoading && orderChangeLoadingType === 3 ? 'Loading...' : 'Cancel Order'}`}
                          </Link>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
};

export default OrderDetailed;
