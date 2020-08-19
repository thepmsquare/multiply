import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./stylesheets/Exercise.css";

class Exercise extends Component {
  render = () => {
    return (
      <div className="Exercise">
        <h1>Exercise</h1>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  };
}

export default Exercise;
