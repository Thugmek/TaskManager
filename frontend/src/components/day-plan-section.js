import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import React, { useState, useEffect } from "react";

export default function DayPlanSection(props) {
  const [dateNow, setDateNow] = useState(new Date());

  function isNowActive() {
    let timeFrom = props.data.from.split(":");
    let timeTo = props.data.to.split(":");
    let dateFrom = new Date();
    let dateTo = new Date();

    dateFrom.setHours(timeFrom[0]);
    dateFrom.setMinutes(timeFrom[1]);
    dateTo.setHours(timeTo[0]);
    dateTo.setMinutes(timeTo[1]);

    if (
      dateFrom.getTime() <= dateNow.getTime() &&
      dateTo.getTime() > dateNow.getTime()
    )
      return true;

    return false;
  }

  return (
    <Card bg={isNowActive() ? "warning" : ""}>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <Col>{props.data.from}</Col>
            <Col>{props.data.to}</Col>
          </Col>
          <Col>
            <h5>{props.data.name}</h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
