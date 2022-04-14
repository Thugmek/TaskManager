import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/Badge";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

export default function Task(props) {
  const navigate = useNavigate();
  return (
    <Accordion.Item eventKey={props.data._id}>
      <Accordion.Header>
        <h4>
          {props.data.name}{" "}
          {props.overdued === true ? <Badge bg="danger">Overdue</Badge> : <></>}
        </h4>
      </Accordion.Header>
      <Accordion.Body>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/editTask/" + props.data._id);
            }}
          >
            <MdModeEdit />
            Edit
          </Button>
          <Button>Complete</Button>
          <Button variant="danger" onClick={props.onDelete}>
            <BsFillTrashFill />
            Delete
          </Button>
        </div>
        <div>
          <pre>{props.data.description}</pre>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
