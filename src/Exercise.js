import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/Input";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./stylesheets/Exercise.css";

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeSliderValue: [1, 10],
      tablesLength: 10,
      rounds: 10,
      time: 10,
      start: false,
      questions: [],
      input: "",
      score: 0,
      timeProgress: 0,
      finish: false,
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
  handleTimeChange = (event, newValue) => {
    this.setState({
      time: newValue,
    });
  };
  handleStart = () => {
    this.setState({ start: true, questions: [], input: "", score: 0 }, () => {
      this.generateQuestion();
    });
  };
  handleStop = () => {
    this.setState({ start: false, finish: false });
  };
  // For ARIA
  valuetext = (value) => {
    return value;
  };
  handleInputChange = (event) => {
    this.setState({ input: event.target.value }, () => {
      this.checkForCorrectAnswer();
    });
  };
  checkForCorrectAnswer = () => {
    let currentRound = this.state.questions.length;
    let answer = this.state.questions[currentRound - 1].answer;
    if (answer === parseInt(this.state.input)) {
      this.setState(
        (curState) => {
          return {
            score: curState.score + 1,
            input: "",
          };
        },
        () => {
          if (currentRound < this.state.rounds) {
            this.generateQuestion();
          } else {
            this.setState({ finish: true, start: false });
          }
        }
      );
    }
  };
  generateQuestion = () => {
    let min = this.state.rangeSliderValue[0];
    let max = this.state.rangeSliderValue[1];
    let p1 = Math.floor(Math.random() * (max - min + 1) + min);
    let p2 = Math.floor(Math.random() * this.state.tablesLength + 1);
    let currentRound = this.state.questions.length + 1;
    const newQuestions = [...this.state.questions];
    newQuestions.push({ p1, p2, answer: p1 * p2, round: currentRound });
    this.setState({ questions: newQuestions, timeProgress: 0 }, () => {
      this.startTimer(currentRound);
    });
  };
  startTimer = (currentRound) => {
    let intervalID = setInterval(() => {
      if (this.state.timeProgress >= 100) {
        this.setState({ input: "" }, () => {
          clearInterval(intervalID);
          if (currentRound < this.state.rounds && this.state.start) {
            this.generateQuestion();
          } else if (this.state.start) {
            this.setState({ finish: true, start: false });
          }
        });
      } else if (this.state.questions.length !== currentRound) {
        console.log("finished early so turning off");
        clearInterval(intervalID);
      } else {
        this.setState((curState) => {
          return {
            timeProgress: curState.timeProgress + 100 / this.state.time,
          };
        });
      }
    }, 1000);
  };
  handleSkip = () => {
    let currentRound = this.state.questions.length;
    this.setState({ input: "" }, () => {
      if (currentRound < this.state.rounds) {
        this.generateQuestion();
      } else {
        this.setState({ finish: true, start: false });
      }
    });
  };
  render = () => {
    return (
      <div className="Exercise">
        {!this.state.start && !this.state.finish && (
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
              valueLabelDisplay="auto"
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
              valueLabelDisplay="auto"
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
              valueLabelDisplay="auto"
              aria-labelledby="number-rounds"
              getAriaValueText={this.valuetext}
            />
            <Typography id="time" gutterBottom>
              Time per round (seconds)
            </Typography>
            <Slider
              min={5}
              max={20}
              step={1}
              marks
              disabled={this.state.start}
              value={this.state.time}
              onChange={this.handleTimeChange}
              valueLabelDisplay="auto"
              aria-labelledby="time"
              getAriaValueText={this.valuetext}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleStart}
            >
              Start
            </Button>
          </div>
        )}
        {this.state.start && this.state.questions.length > 0 && (
          <div className="Exercise-bottom">
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleStop}
            >
              Stop
            </Button>
            <Card className="Exercise-card">
              <LinearProgress
                variant="determinate"
                value={this.state.timeProgress}
              />
              <CardContent>
                <Typography gutterBottom>
                  Round: {this.state.questions.length} / {this.state.rounds}
                </Typography>
                <Typography gutterBottom>
                  {this.state.questions[this.state.questions.length - 1].p1} X{" "}
                  {this.state.questions[this.state.questions.length - 1].p2}
                </Typography>
                <TextField
                  value={this.state.input}
                  onChange={this.handleInputChange}
                  className="Exercise-input"
                  inputProps={{ style: { textAlign: "center" } }}
                  type="number"
                />
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.handleSkip}>
                  Skip
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
        {!this.state.start && this.state.finish && (
          <div className="Exercise-score">
            <Card className="Exercise-card">
              <CardContent>
                <Typography gutterBottom>
                  Your Score is {this.state.score} / {this.state.rounds}.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={this.handleStop}>
                  Continue
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
      </div>
    );
  };
}

export default Exercise;
