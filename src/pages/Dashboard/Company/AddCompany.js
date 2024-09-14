import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Row,Dropdown, DropdownItem,DropdownToggle, DropdownMenu } from "reactstrap";
import Input from "../../../components/Forms/Input";
import { useDispatch } from "react-redux";
import ButtonComp from "../../../components/UI/Button";
import ErrorOrConfirm from "../../../components/UI/ErrorOrConfirm";
import { useParams } from "react-router";
import { Api } from "../../../common/Api";
import * as bussAction from "../../../store/Buss/action";
import ImageUplaod from "components/Common/ImageUpload";
import ModalComp from "components/Common/Modal";
import CompanyRouteDrodown from "common/companyRouteDropdowns";
import NavTabComp from "components/Common/TabsComp";

const AddCompany = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");
  const [uploadPopup, setUploadPopup] = useState(false);
  const [imgPreview, setImgPreview] = useState("http://mannoo-001-site5.etempurl.com/images/default-image.png");

  // STATS FOR FIELD
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [OperatingFrom, setOperatingFrom] = useState("");
  const [Address, setAddress] = useState("");
  const [CreatedOn, setCreatedOn] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [uniqueCompanyCode, setUniqueCompanyCode] = useState('')
  const [password, setPassword] = useState("");

  const [isEdit, setIsEdit] = useState({});

  const {Id : userId} = JSON.parse(localStorage.getItem("userId")) || {}

  //   GET USER MAIN DATA
  const { user } = JSON.parse(localStorage.getItem("authUser"));

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (id === 0) {
      setIsEdit(null);
    } else {
      const companyId = user.isCompanyAdmin ? user.companyId : id;
      const fetchCompanyProfileData = async () => {
        try {
          const response = await fetch(`${Api}company/company/${companyId}`, {
            method: "GET",
          });
          const { data, success, message } = await response.json();

          // console.log(resData.success);
          if (success === false) {
            throw new Error(message);
          } else {
            setIsEdit(data);
            setName(data.Name);
            setPhone(data.PhoneNo);
            setEmail(data.Email);
            setOperatingFrom(data.OperatingFrom);
            setAddress(data.Address);
            setCreatedOn(data.createdOn?.slice(0, 10));
            setImgPreview(data.logoUrl);
            setUniqueCompanyCode(data.Code)
          }
          setIsLoading(false);
        } catch (e) {
          console.log("Fetch Scheduel Data", e);
          setIsLoading(false);
        }
      };
      fetchCompanyProfileData();
    }
  }, []);

  const dispatcher = useDispatch();
  // ADD ROUTE
  const addRouteHandler = async () => {
    console.log(id === '0' ? "POST" : "PUT")
    console.log(imageBase64);
    console.log(imageType);
    console.log(Address);
    setConfirmRoute("");
    setError("");
    try {
      setIsAddRoute(true);
      console.log(id === '0' ? "POST" : "PUT")
      await dispatcher(
        bussAction.AddEditFunc(
          {
            code: uniqueCompanyCode,
            name: Name,
            email: Email,
            phoneNo: Phone,
            operatingFrom: OperatingFrom,
            address: Address,
            active: true,
            password: 12345,
            picture: {
              binary: imageBase64,
              mimeType: imageType,
            },
          },
          `${id === '0' ? "company/add-company" : `company/update-company/${id}`}`,
          `${id === '0' ? "POST" : "PUT"}`,
        )
      );
      setIsAddRoute(false);
      setConfirmRoute(`Company ${id === '0' ? 'Add' : 'Edit'} Successfully`);
      if(userId === 0) {
        props.history.goBack();
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setIsAddRoute(false);
    }
  };

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
          <Container fluid={true}>
            <ErrorOrConfirm error={error} confirmRoute={confirmRoute} />
            {userId === 0 && id !== "0" ? <NavTabComp history={props.history} id={id} activeTab={"0"}/> : null}
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                  <Row>
                  <Col md={2} >
                    <img
                      onClick={() => setUploadPopup(true)}
                      className="rounded-circle avatar-lg"
                      alt="Company_Logo"
                      src={imgPreview}
                    />

                  </Col>
                  <Col md={1} style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                      <button
                       onClick={() => setUploadPopup(true)}
                      style={{marginLeft:-40}}
                              type="button"
                              className="btn btn-light waves-effect waves-light w-sm"
                            >
                              <i className="mdi mdi-upload d-block font-size-16"></i>{" "}
                              Upload
                            </button>
                  </Col>
                  
                </Row>
                    <form>
                      <Row><Col lg="12"><h2 style={{marginTop:15}} className="card-title">{id !== '0' ? "Edit Company" : "Add Company"}</h2></Col></Row>
                      <Row>
                        <Col lg="6">
                          
                          <Input
                            inputFieldHandler={(e) => setName(e)}
                            Label="Name"
                            col="12"
                            id="Name"
                            initialValue={Name}
                          />
                          <Input
                            inputFieldHandler={(e) => setPhone(e)}
                            Label="Phone"
                            col="12"
                            id="Phone"
                            type="number"
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            initialValue={Phone}
                          />
                          <Input
                            inputFieldHandler={(e) => setAddress(e)}
                            Label="Address"
                            col="12"
                            id="Address"
                            initialValue={Address}
                          />
                          <Input
                            inputFieldHandler={(e) => setUniqueCompanyCode(e)}
                            Label="Unique Company Code"
                            maxLenght={3}
                            col="12"
                            id="uniqueCompanyCode"
                            initialValue={uniqueCompanyCode}
                          />
                        </Col>
                        <Col lg="6">
                          <Input
                            inputFieldHandler={(e) => setEmail(e)}
                            Label="Email"
                            col="12"
                            id="Email"
                            initialValue={Email}
                          />
                          <Input
                            inputFieldHandler={(e) => setOperatingFrom(e)}
                            Label="Operating From"
                            col="12"
                            id="OperatingFrom"
                            initialValue={OperatingFrom}
                          />
                          {!isEdit ? null : (
                            <Input
                              inputFieldHandler={(e) => setCreatedOn(e)}
                              Label="Created On"

                              col="12"
                              id="createdOn"
                              initialValue={CreatedOn}
                            />
                          )}
                          {isEdit ? null : (
                            <Input
                              inputFieldHandler={(e) => setPassword(e)}
                              Label="Password"

                              col="12"
                              id="Password"
                              // initialValue={inputState.InputValues.Password}
                            />
                          )}

                        </Col>
                      </Row>
                    </form>

                    {/* UPLOADER WILL BE OPEN IN POPUP */}
                    <ModalComp
                      title="Uplaod Logo"
                      setIsStopAddPopup={() => setUploadPopup(false)}
                      isStopAddPopup={uploadPopup}
                    >
                      <ImageUplaod
                        Preview={(e) => {
                          setImgPreview(e), setUploadPopup(false);
                        }}
                        setImageBase64={(e) => setImageBase64(e)}
                        imageType={(e) => setImageType(e)}
                      />
                    </ModalComp>
                    {/* Modal Start from here */}

                      <ButtonComp
                        isLoading={isAddRoute}
                        // disabled={Name || Email || Phone === '' ? true : false}
                        onClick={addRouteHandler}
                        Label={`${id === "0" ? "Add" : "Edit"}`}
                      />

                    {/* TABLES START HERE */}
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

export default AddCompany;
