import DayPlanSection from "./components/day-plan-section";
import { useState, useEffect } from "react";
import config from "./config";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { HiPlusCircle } from "react-icons/hi";
import { BsFillTrashFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export default function DayTemplateList() {
  const params = useParams();
  const navigate = useNavigate();

  let [days, setDays] = useState([]);

  useEffect(() => {
    fetch(
      "http://" +
        window.location.hostname +
        ":" +
        config.port +
        "/api/day/listTemplates"
    )
      .then((res) => res.json())
      .then((json) => {
        setDays(json);
      });
  }, []);

  return (
    <>
      <h1>
        Day templates{" "}
        <Button
          variant="outline-secondary"
          onClick={() => {
            navigate("/editDay/");
          }}
        >
          <HiPlusCircle size={30} />
        </Button>
      </h1>
      {days.map((a, i) => {
        return (
          <Card key={i}>
            <Card.Body>
              <Row>
                <Col>
                  <h5>{a.name}</h5>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-primary"
                    className="d-flex align-items-center"
                    onClick={() => {
                      //navigate("/editDay/" + day);
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    className="d-flex align-items-center"
                    onClick={() => {}}
                  >
                    <BsFillTrashFill />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
