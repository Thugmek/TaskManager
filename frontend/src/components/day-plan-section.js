import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export default function DayPlanSection(props) {
  return (
    <Card bg={props.data.active?"warning":""}>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <Col>{props.data.from}</Col>
            <Col>{props.data.to}</Col>
          </Col>
          <Col>{props.data.text}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
