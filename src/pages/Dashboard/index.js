import React, { useState, useEffect } from "react";

import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

//Import mini card widgets
import MiniCards from "./mini-card";
import { map } from "lodash";
import { TerminalActions, CompanyActions } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [miniCards, setMiniCards] = useState([
    {
      title: "Availabale Busses",
      iconClass: "bx-check-circle",
      text: "125",
    },
    { title: "Pending Projects", iconClass: "bx-hourglass", text: "12" },
    { title: "Total Revenue", iconClass: "bx-package", text: "$36,524" },
  ]);

  // FETCH ROUTE FROM SERVER
  const dispatcher = useDispatch();
  useEffect(() => {
    const fetchAllTerminal = async () => {
      await dispatcher(TerminalActions.fetchAllTerminal(1));
      await dispatcher(CompanyActions.fetchAllCompanies());
    };
    fetchAllTerminal();
  }, []);
  // END FETCH ROUTE FROM SERVER

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            {map(miniCards, (card, key) => (
              <MiniCards
                title={card.title}
                text={card.text}
                iconClass={card.iconClass}
                key={"_card_" + key}
              />
            ))}
          </Row>

          <Row>
            <Col md={6}>
              <Card>
                <CardBody>
                  <CardTitle>Recent Booking</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Route</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>M. Ali</td>
                          <td>Karachi to Swat</td>
                          <td>Luxury</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Nasir G.</td>
                          <td>Lahore to Rawalpindi</td>
                          <td>Economy</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>A Rehman</td>
                          <td>Lahore To Islamabad</td>
                          <td>Sleeper</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <CardBody>
                  <CardTitle>Upcoming Trips</CardTitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Route</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>M. Ali</td>
                          <td>Karachi to Swat</td>
                          <td>Luxury</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Nasir</td>
                          <td>Lahore to Rawalpindi</td>
                          <td>Economy</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>A Rehman</td>
                          <td>Lahore To Islamabad</td>
                          <td>Sleeper</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
