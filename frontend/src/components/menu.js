import style from "./menu.module.css";
import MenuItem from "./menu-item";
//import React from "react";
export default function Menu(props) {
  return (
    <div>
      <MenuItem to="/" text="Dashboard" />
      <MenuItem to="/tasks" text="Tasks" />
      <MenuItem to="/calendar" text="Calendar" />
      <MenuItem to="/about" text="About" />
    </div>
  );
}
