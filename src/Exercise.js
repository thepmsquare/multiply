import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import "./stylesheets/Exercise.css";

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeSliderValue: [1, 10],
      tablesLength: 10,
      rounds: 10,
      start: false,
    };
  }
  handleRangeChange = (event, newValue) => {
    this.setState({
      rangeSliderValue: newValue,
    });
  };
  handleLengthChange = (event, newValue) => {
    this.setState({
      tablesLength: newValue,
    });
  };
  handleRoundsChange = (event, newValue) => {
    this.setState({
      rounds: newValue,
    });
  };
  handleStart = () => {
    this.setState({ start: true });
  };
  handleStop = () => {
    this.setState({ start: false });
  };
  valuetext = (value) => {
    return value;
  };
  render = () => {
    return (
      <div className="Exercise">
        <div className="Exercise-top">
          <Typography id="range-tables" gutterBottom>
            Range of multiplication tables
          </Typography>
          <Slider
            min={0}
            step={10}
            marks
            disabled={this.state.start}
            value={this.state.rangeSliderValue}
            onChange={this.handleRangeChange}
            valueLabelDisplay="on"
            aria-labelledby="range-tables"
            getAriaValueText={this.valuetext}
          />
          <Typography id="length-tables" gutterBottom>
            Length of multiplication tables
          </Typography>
          <Slider
            min={10}
            step={1}
            disabled={this.state.start}
            value={this.state.tablesLength}
            onChange={this.handleLengthChange}
            valueLabelDisplay="on"
            aria-labelledby="length-tables"
            getAriaValueText={this.valuetext}
          />
          <Typography id="number-rounds" gutterBottom>
            Number of rounds
          </Typography>
          <Slider
            min={5}
            max={20}
            step={1}
            marks
            disabled={this.state.start}
            value={this.state.rounds}
            onChange={this.handleRoundsChange}
            valueLabelDisplay="on"
            aria-labelledby="number-rounds"
            getAriaValueText={this.valuetext}
          />
          {this.state.start ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleStop}
            >
              Stop
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleStart}
            >
              Start
            </Button>
          )}
        </div>
      </div>
    );
  };
}

export default Exercise;
