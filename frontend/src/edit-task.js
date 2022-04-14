import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [task, setTask] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    console.log("fetching task...", params);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: params.id }),
    };
    fetch(
      "http://" + window.location.hostname + ":3000/task/get",
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        setTask(json);
        setName(json.name);
        setDescription(json.description);
        setDate(json.date);
        setTime(json.time);
      });
  }, []);

  function submitToBE() {
    let payload = { _id: task._id, name, description, date, time };
    console.log(payload);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    fetch(
      "http://" + window.location.hostname + ":3000/task/update",
      requestOptions
    ).then((res) => {
      navigate("/tasks");
    });
  }

  return (
    <>
      <h1>Edit Task</h1>
      <Form>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(v) => setName(v.target.value)}
            placeholder="Enter task name..."
          />
        </Form.Group>

        <Form.Group controlId="description" className="my-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(v) => setDescription(v.target.value)}
            placeholder="Enter description..."
          />
        </Form.Group>

        <Form.Group controlId="date" className="my-3">
          <Row>
            <Col>
              <Form.Label>Due date</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="date"
                value={date}
                onChange={(v) => setDate(v.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="time"
                value={time}
                onChange={(v) => setTime(v.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button
          className="my-3"
          variant="primary"
          onClick={() => {
            submitToBE();
          }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
