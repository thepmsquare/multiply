import React, { Component } from "react";
import Exercise from "./Exercise";
import "./stylesheets/App.css";

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <Exercise />
      </div>
    );
  };
}

export default App;
