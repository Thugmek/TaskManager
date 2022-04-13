import React, { useState, useEffect } from "react";
import Task from "./task";
import Accordion from "react-bootstrap/Accordion";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = () => {
    console.log("Fetching...");
    fetch("http://localhost:3000/task/list")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTasks(json);
      });
  };

  let deleteTask = (task) => {
    console.log("Delete " + task._id);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: task._id }),
    };
    fetch("http://localhost:3000/task/delete", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        fetchData();
      });
  };

  if (tasks.length > 0)
    return (
      <>
        <Accordion>
          {tasks.map((a) => {
            return (
              <Task
                key={a._id}
                data={a}
                onDelete={() => {
                  deleteTask(a);
                }}
              />
            );
          })}
        </Accordion>
      </>
    );
  else return <>loading...</>;
}
