import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import style from "./menu.module.css";
//import React from "react";
export default function MenuItem(props) {
  return (
    <Link style={{ width: "100%" }} to={props.to}>
      <Button style={{ width: "100%", marginTop: "5px" }} variant="primary">
        {props.text}
      </Button>
    </Link>
  );
}
