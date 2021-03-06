import Button from "react-bootstrap/esm/Button";
import TaskList from "./components/task-list";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";

export default function Tasks() {
  return (
    <>
      <h1>Task List</h1>
      <Link style={{ width: "100%" }} to="/newTask">
        <Button>
          <MdModeEdit />
          New Task
        </Button>
      </Link>
      <TaskList />
    </>
  );
}
