import React, { useState,useEffect } from "react";
import { Card, CardBody, Col, Container, Row, UncontrolledAlert } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { TerminalActions,CommonAction } from "../../store/actions";
import ErrorOrConfirm from '../../components/UI/ErrorOrConfirm'

import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import TableHeader from '../../components/UI/TableHeader'
import {Fetch} from '../../components/Server/Fetch'
import CompanyRouteDrodown from "common/companyRouteDropdowns";
import NavTabComp from "./TabsComp";
import DropDownData from "./DropDownData";

// Import table
import MaterialTableComp from "../Table/MateralTable";

const TableListingComp = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isRouteUpdate, setIsRouteUpdate] = useState(false);
  const [search, setSearch] = useState(null);
  const [confirmRoute, setConfirmRoute] = useState("");
  const [city, setCity] = useState(0)
  const [cityDropdown, setCityDropdown] = useState([])
  const [secondDropdown, setSecondDropdown] = useState([])
  const [secondDropdownValue, setSecondDropdownValue] = useState(0)
  const [secondDropdownLoading, setSecondDropdownLoading] = useState(false)
  console.log(search)

  // EXTRA FILTER FIELDS
  const [maxFilterOneValue, setMaxFilterOneValue] = useState('')
  const [maxFilterTwoValue, setMaxFilterTwoValue] = useState('')
  const [maxFilterThreeValue, setMaxFilterThreeValue] = useState('')
  const [maxFilterFourValue, setMaxFilterFourValue] = useState('')
  const [endDate, setEndDate] = useState()

  // THIS STATE IS TEMPERARY COMPANY USE WE WILL DELETE IT MAY BE IN FUTURE
  const [isCompany, setIsCompany] = useState(0)

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

  const mainId = (Id === 0 && props.companySpecific) ? props.param : Id
  
  useEffect(()=>{
    if(props.companyId) {
      setIsCompany(props.companyId)
    }
  },[props.companyId])
  
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState("");

  const {Loading, isError} = Fetch(props.fetchData(mainId, pageSize, pageIndex,search, city, isCompany,secondDropdownValue, maxFilterOneValue,maxFilterTwoValue,maxFilterThreeValue,maxFilterFourValue,endDate), search, pageIndex, isDelete, city,secondDropdownValue, maxFilterOneValue,maxFilterTwoValue,maxFilterThreeValue,maxFilterFourValue,endDate)
  
  // setpageIndex
  const setPageIndexHandler = (pageSize, pageIndex) => {
    setPageIndex(pageIndex);
  };

  let Load;
  let cityError
  if(props.isDropdown) {
      const {Loading, isError} = Fetch(props.fetchDropDownData)
      Load= Loading
      cityError= isError
  }

  const dispatcher = useDispatch()
  // DELETE ROUTE HANDLER
  const deleteRouteHandler = async (rowData) => {
    try {
      setIsDelete(true)
      await dispatcher(props.deleteAction(mainId,rowData.Id));
      if (props.data.length === 1 && pageIndex > 1) {
        setPageIndex(pageIndex - 1);
      } else {
        setIsDelete(false)
      }
      setConfirmRoute(`${props.pageTitle} Deleted Successfully!`)
    } catch (err) {
      console.log(err);
      setError(err)
      setIsRouteUpdate(false);
    }
  };

  const setSearchHandler = (e) =>{
    setPageIndex(1)
    setSearch(e)
  }

  // 
   // useEffect to set Terminal Dropdown
   if(props.isDropdown) {
       useEffect(() => { 
        let options = [{
          label: 'All',
          value: 'All',
          Id: 0,
        }];
        if (props.noAll) {
          options = []
        }
        for (let key in props.dropdownData) {
          options.push({
            label: props.dropdownData[key].Name,
            value: props.dropdownData[key].Name,
            Id: props.dropdownData[key].Id,
          });
        }
        const optionGroup = [
          {
            options,
          },
        ];
        setCityDropdown(optionGroup);
      }, [Load]);
      // useEffect to set Terminal Dropdown End
   }

  //  IF THERE IS SECOND DROPDWN
  let secondDropdownLoad;
  let secondCityError
    if(props.dropdownTwo) {
        const {Loading, isError} = Fetch(props.fetchDropdownTwo)
        secondDropdownLoad= Loading
        secondCityError= isError
    }

  // SET DROPDOWN TWO DATA IF ITS TRUE

    if(props.dropdownTwo) {
      // let dropdownTwoData = DropDownData(props.dropdownTwoData, secondDropdownLoad)
      // console.log(dropdownTwoData)
      // setSecondDropdown(dropdownTwoData)
  
      useEffect(() => {
        let options = [{
          label: 'All',
          value: 'All',
          Id: 0,
        }];
        if (props.noAll) {
          options = []
        }
        for (let key in props.dropdownTwoData) {
          options.push({
            label: props.dropdownTwoData[key].Name,
            value: props.dropdownTwoData[key].Name,
            Id: props.dropdownTwoData[key].Id,
          });
        }
        const optionGroup = [
          {
            options,
          },
        ];
        setSecondDropdown(optionGroup);
      },[secondDropdownLoad])
    }


  // SET CITY HANDLER
  const setCityHanlder = (e) =>{
    setPageIndex(1)
    setCity(e)
  }

    // SET SECOND DROPDOWN
    const setSecondDropdownHandler = (e) =>{
      setPageIndex(1)
      setSecondDropdownValue(e)
    }

  return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <ErrorOrConfirm error={isError} confirmRoute={confirmRoute}/>
            {Id === 0 && props.companySpecific ?<NavTabComp history={props.history} id={props.param} activeTab={props.activeTab}/> : null}
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <TableHeader
                    title={props.pageTitle}
                    history={props.history}
                    buttonText={props.buttonText}
                    Link={`${props.Link}/0`}
                    setDropDown={(e)=>setCityHanlder(e)}
                    setDropDownTwo={(e)=>setSecondDropdownHandler(e)}
                    dropDownLabel={props.dropDownLabel}
                    dropdownOptions={cityDropdown}
                    secondDropdownOptions={secondDropdown}
                    dropdownTwo={props.dropdownTwo}
                    searchValue={(e)=>setSearchHandler(e)}
                    isDropdown={props.isDropdown}
                    noSearch={props.noSearch}
                    noPaging={props.noPaging}
                    editable={props.editable}
                    dateSearch={props.dateSearch}
                  endDate={props.endDate}
                  maxFilter={props.maxFilter}
                  maxFilterInputOne={props.maxFilterInputOne}
                  maxFilterInputTwo={props.maxFilterInputTwo}
                  maxFilterInputThree={props.maxFilterInputThree}
                  maxFilterInputFour={props.maxFilterInputFour}
                  maxFilterOneValue={(e)=> {setPageIndex(0), setMaxFilterOneValue(e)}}
                  maxFilterTwoValue={(e)=> {setPageIndex(0), setMaxFilterTwoValue(e)}}
                  maxFilterThreeValue={(e)=> {setPageIndex(0), setMaxFilterThreeValue(e)}}
                  maxFilterFourValue={(e)=> {setPageIndex(0), setMaxFilterFourValue(e)}}
                  setEndDate={(e)=> {setPageIndex(0), setEndDate(e)}}
                    />
          
                      <MaterialTableComp
                        isAddRoute={Loading}
                        title="Route"
                        isLoading={props.isLoading || Loading}
                        routeData={props.data}
                        PageIndex={props.pagingInfo.PageIndex}
                        TotalCount={props.pagingInfo.TotalCount}
                        fetchRouteHandler={setPageIndexHandler}
                        deleteRouteHandler={deleteRouteHandler}
                        history={props.history}
                        Link={props.Link}
                        editable={props.editable}
                        columns={props.column}
                        noDelete={props.noDelete}
                        noPaging={props.noPaging ? true : false}
                      />

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }

export default TableListingComp;
