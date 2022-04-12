import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import style from "./components/menu.module.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dashboard from "./dashboard";
import Menu from "./components/menu";
import About from "./About";
import Tasks from "./tasks";
import NewTask from "./new-task";

function App() {
  return (
    <>
      <Router>
        <Container fluid>
          <Row>
            <Col style={{ padding: "0" }}>
              <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Navbar.Text>Header</Navbar.Text>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col
              xs={3}
              style={{
                backgroundColor: "silver",
                minHeight: "calc(100vh - 60px)",
              }}
            >
              <Menu />
            </Col>
            <Col>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/about" element={<About />} />
                <Route path="/newTask" element={<NewTask />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  );
}

export default App;
