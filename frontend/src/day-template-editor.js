import DayPlanSection from "./components/day-plan-section";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { BsFillTrashFill } from "react-icons/bs";
import { HiPlusCircle } from "react-icons/hi";
import config from "./config";

function validateTime(val) {
  return /^\d{2}:\d{2}$/.test(val);
}

export default function DayTemplateEditor(props) {
  const params = useParams();

  const [plan, setPlan] = useState([
    { from: "10:00", to: "15:00", name: "Úsek 1" },
    { from: "10:15", to: "16:00", name: "Úsek 2" },
    { from: "16:00", to: "20:00", name: "Úsek 3" },
  ]);

  /*useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: params.id }),
    };
    fetch(
      "http://" +
        window.location.hostname +
        ":" +
        config.port +
        "/api/day/getDay",
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        setPlan(json.day);
      });
  }, []);

  function fetchUpdate() {
    let payload = { date: params.id, day: plan };
    console.log(payload);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    fetch(
      "http://" +
        window.location.hostname +
        ":" +
        config.port +
        "/api/day/updateDay",
      requestOptions
    ).then((res) => {
      //navigate("/tasks");
    });
  }*/

  function handleSort() {
    let allValid = true;
    plan.forEach((p, i) => {
      if (!validateTime(p.from) || !validateTime(p.to)) {
        allValid = false;
      }
    });

    if (allValid) {
      plan.sort((a, b) => a.from.localeCompare(b.from));
    }
    setPlan([...plan]);
  }

  return (
    <>
      {props.isNew ? (
        <>
          <h1>New template </h1>
          <Form.Control
            type="text"
            value={1}
            onChange={(v) => {}}
            placeholder="Template name"
          />
        </>
      ) : (
        <h1>Edit template {params.id}</h1>
      )}
      <Button>Submit</Button>
      <Form className="px-3">
        <Row key={"header"}>
          <Col className="px-0">
            <Form.Label>
              <h5 className="mb-0 mt-3">From</h5>
            </Form.Label>
          </Col>
          <Col className="px-0">
            <Form.Label>
              <h5 className="mb-0 mt-3">To</h5>
            </Form.Label>
          </Col>
          <Col xs={6} className="px-0">
            <Form.Label>
              <h5 className="mb-0 mt-3">Text</h5>
            </Form.Label>
          </Col>
          <Col xs="auto" className=" px-0 d-flex justify-items-center">
            <Button
              variant="outline-success"
              className="d-flex align-items-center"
              onClick={() => {
                setPlan([...plan, { from: "", to: "", name: "" }]);
              }}
            >
              <HiPlusCircle />
            </Button>
          </Col>
        </Row>
        {plan.map((p, i) => {
          let fromValid = validateTime(p.from);
          let toValid = validateTime(p.to);
          let textValid = p.name.length > 0;
          let timeConflict = false;
          if (i > 0) {
            let before = plan[i - 1].to;
            if (before.localeCompare(p.from) > 0) {
              timeConflict = true;
            }
          }
          return (
            <Row key={i}>
              <Form.Text className="text-muted" hidden={!timeConflict}>
                ---Conflict---
              </Form.Text>
              <Col className="px-0">
                <Form.Control
                  type="text"
                  value={p.from}
                  onChange={(v) => {
                    plan[i].from = v.target.value;
                    setPlan([...plan]);
                    handleSort();
                  }}
                  placeholder="HH:MM"
                  isInvalid={!fromValid}
                />
                <Form.Text className="text-muted" hidden={fromValid}>
                  Invalid time format.
                </Form.Text>
              </Col>
              <Col className="px-0">
                <Form.Control
                  type="text"
                  value={p.to}
                  onChange={(v) => {
                    plan[i].to = v.target.value;
                    setPlan([...plan]);
                  }}
                  placeholder="HH:MM"
                  isInvalid={!toValid}
                />
                <Form.Text className="text-muted" hidden={toValid}>
                  Invalid time format.
                </Form.Text>
              </Col>
              <Col xs={6} className="px-0">
                <Form.Control
                  type="text"
                  value={p.name}
                  onChange={(v) => {
                    plan[i].name = v.target.value;
                    setPlan([...plan]);
                  }}
                  placeholder="Enter day section name..."
                  isInvalid={!textValid}
                />
                <Form.Text className="text-muted" hidden={textValid}>
                  Enter some text...
                </Form.Text>
              </Col>
              <Col xs="auto" className="px-0 d-flex justify-content-center">
                <Button
                  variant="outline-danger"
                  className="d-flex align-items-center"
                  onClick={() => {
                    plan.splice(i, 1);
                    setPlan([...plan]);
                  }}
                >
                  <BsFillTrashFill />
                </Button>
              </Col>
            </Row>
          );
        })}
      </Form>
    </>
  );
}
