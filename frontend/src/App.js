import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dashboard from "./dashboard";
import Menu from "./components/menu";
import About from "./About";
import Tasks from "./tasks";
import NewTask from "./new-task";
import EditTask from "./edit-task";
import style from "./app.module.css";
import DayPlan from "./day-plan";
import { MdPerson } from "react-icons/md";

function App() {
  return (
    <>
      <Router>
        <Container fluid>
          <Row>
            <Col style={{ padding: "0" }}>
              <Navbar
                className="justify-content-center fs-3"
                bg="dark"
                variant="dark"
                style={{ height: "60px" }}
              >
                <Navbar.Text>
                  <MdPerson /> Header
                </Navbar.Text>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={3} lg={2} className={style.leftMenu}>
              <Menu />
            </Col>
            <Col>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/about" element={<About />} />
                <Route path="/newTask" element={<NewTask />} />
                <Route path="/calendar" element={<DayPlan />} />
                <Route path="/editTask/:id" element={<EditTask />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  );
}

export default App;

export {};
