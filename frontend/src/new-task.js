import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function NewTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <h1>New Task</h1>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(v) => setName(v.target.value)}
            placeholder="Enter task name..."
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(v) => setDescription(v.target.value)}
            placeholder="Enter description..."
          />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Due date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(v) => setDate(v.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            console.log(name);
            console.log(description);
            console.log(date);
          }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}
