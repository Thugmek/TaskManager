import React, { useState, useEffect } from "react";
import Task from "./task";
import Accordion from "react-bootstrap/Accordion";
import LoadingPlaceholder from "./loading-placeholder";
import config from "../config";

export default function TaskList() {
  const [tasks, setTasks] = useState({ today: [], thisWeek: [], later: [] });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = () => {
    setLoading(true);
    console.log("Fetching...");
    fetch("http://" + window.location.hostname + ":"+config.port+"/api/task/list")
      .then((res) => res.json())
      .then((json) => {
        let today = [];
        let thisWeek = [];
        let later = [];
        let now = new Date();
        now.setUTCHours(0, 0, 0, 0);
        json.sort((a, b) => {
          if (b.date === undefined || b.time === "") return 1;
          if (a.date === undefined || a.time === "") return -1;
          let dateAString = a.date;
          let dateBString = b.date;

          if (a.time !== undefined && a.time !== "")
            dateAString += "T" + a.time + "Z";
          if (b.time !== undefined && b.time !== "")
            dateBString += "T" + b.time + "Z";
          let dateA = new Date(dateAString);
          let dateB = new Date(dateBString);

          return dateA.getTime() - dateB.getTime();
        });
        json.forEach((e) => {
          let duedate = new Date(e.date);
          let daysLeft = (duedate.getTime() - now.getTime()) / 86400000;

          if (daysLeft <= 0) {
            if (daysLeft < 0) {
              e.overdued = true;
            }
            today.push(e);
          } else if (daysLeft <= 7) {
            thisWeek.push(e);
          } else {
            later.push(e);
          }
        });
        setTasks({ today, thisWeek, later });
        setLoading(false);
      });
  };

  let deleteTask = (task) => {
    console.log("Delete " + task._id);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: task._id }),
    };
    fetch(
      "http://" + window.location.hostname + ":"+config.port+"/api/task/delete",
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        fetchData();
      });
  };

  if (isLoading)
    return (
      <>
        <LoadingPlaceholder />
      </>
    );

  return (
    <>
      <h4>Today</h4>
      {tasks.today.length > 0 ? (
        <Accordion>
          {tasks.today.map((a) => {
            return (
              <Task
                overdued={a.overdued}
                key={a._id}
                data={a}
                onDelete={() => {
                  deleteTask(a);
                }}
              />
            );
          })}
        </Accordion>
      ) : (
        <>No tasks today...</>
      )}

      <h4>This week</h4>
      {tasks.thisWeek.length > 0 ? (
        <Accordion>
          {tasks.thisWeek.map((a) => {
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
      ) : (
        <>No tasks this week...</>
      )}

      <h4>Later</h4>
      {tasks.later.length > 0 ? (
        <Accordion>
          {tasks.later.map((a) => {
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
      ) : (
        <>No future tasks...</>
      )}
    </>
  );
}
