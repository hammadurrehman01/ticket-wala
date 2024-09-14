import PropTypes from "prop-types";
import React, { useState } from "react";

import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  UncontrolledAlert,
} from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser, apiError } from "store/actions";

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logo.svg";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // handleValidSubmit

  // LOGIN FUNCTION TO CALL LOGIN API
  const handleValidSubmit = async (event, values) => {
    setErrorMessage("");
    try {
      setIsLoading(true);
      await props.loginUser(values, props.history);
      setIsLoading(false);
      props.history.push("./dashboard");
    } catch (err) {
      setIsLoading(false);
      console.log("i just catch", err.message);
      setErrorMessage(err.message);
    }
  };

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              {/* Alert */}
              {errorMessage === "" ? null : (
                <UncontrolledAlert
                  onClick={() => setErrorMessage("")}
                  color="warning"
                  className="alert-dismissible fade show"
                  role="alert"
                >
                  <i className="mdi mdi-alert-outline mr-2"></i>
                  {errorMessage}
                </UncontrolledAlert>
              )}
              <Card className="overflow-hidden">
                <div className="bg-soft-primary">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Ticket Wala.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v);
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="form-group">
                        <AvField
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customControlInline"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        {isLoading ? (
                          <button
                            type="button"
                            className="btn btn-primary btn-block waves-effect waves-light"
                          >
                            <i className="bx bx-loader bx-spin font-size-16 align-middle mr-2"></i>{" "}
                            Please Wait
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                            onClick={() => { }}
                          >
                            Log In
                          </button>
                        )}
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock mr-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link
                    to="register"
                    className="font-weight-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Ticket Wala. Powered By{" "}
                  <a>FM DIGITALS</a>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
);

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
};
