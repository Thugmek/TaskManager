import DayPlanSection from "./components/day-plan-section";
import { useState, useEffect } from "react";
import config from "./config";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { MdModeEdit } from "react-icons/md";

export default function DayPlan() {
  const params = useParams();
  const navigate = useNavigate();

  let [day, setDay] = useState(
    typeof params.id === "undefined"
      ? new Date().toISOString().split("T")[0]
      : params.id
  );
  let [plan, setPlan] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: day }),
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

  return (
    <>
      <h1>
        Plan of the day{" "}
        <Button variant="secondary" onClick={()=>{navigate("/editDay/"+day)}}>
          <MdModeEdit />
        </Button>
      </h1>
      <h4>{day}</h4>
      {plan.map((a, i) => {
        return <DayPlanSection data={a} key={i} />;
      })}
    </>
  );
}
