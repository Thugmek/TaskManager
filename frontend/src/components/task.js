import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/esm/Button";
export default function Task(props) {
  return (
    <Accordion.Item eventKey={props.data._id}>
      <Accordion.Header>
        <h4>{props.data.name}</h4>
      </Accordion.Header>
      <Accordion.Body>
        <div>
          <Button>Edit</Button>
          <Button>Complete</Button>
          <Button onClick={props.onDelete}>Delete</Button>
        </div>
        <div>
          <pre>{props.data.description}</pre>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
