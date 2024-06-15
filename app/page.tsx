"use client";
import { useState } from "react";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import uiConfig from "@/config/ui";
import { Questions } from "@/types/Questions";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  LinearProgress,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "./page.module.css";

import type { SliderOwnProps } from "@mui/material";
export default function Home() {
  // state
  const [currentThemePalette, changeCurrentThemePalette] = useState(
    uiConfig.defaultThemePalette
  );
  const [gameStage, changeGameStage] = useState<1 | 2 | 3>(1);
  const [rangeSliderValue, changeRangeSliderValue] = useState<
    SliderOwnProps["value"]
  >([1, 10]);
  const [tablesLength, changeTablesLength] = useState<number>(10);
  const [rounds, changeRounds] = useState<number>(10);
  const [time, changeTime] = useState<number>(10);
  const [questions, changeQuestions] = useState<Questions>([]);
  const [input, changeInput] = useState<string>("");
  const [score, changeScore] = useState<number>(0);
  const [timeProgress, changeTimeProgress] = useState<number>(0);
  // functions
  const handleThemeToggle = () => {
    if (currentThemePalette === "dark") {
      changeCurrentThemePalette("light");
    } else {
      changeCurrentThemePalette("dark");
    }
  };
  const startTimer = (currentRound: number) => {
    let intervalID = setInterval(() => {
      if (timeProgress >= 100) {
        changeInput("");
        clearInterval(intervalID);
        if (currentRound < rounds && gameStage === 2) {
          generateQuestion();
        } else if (gameStage === 2) {
          changeGameStage(3);
        }
      } else if (questions.length !== currentRound) {
        console.log("finished early so turning off");
        clearInterval(intervalID);
      } else {
        changeTimeProgress((curTimeProgress) => {
          return (curTimeProgress + 100) / time;
        });
      }
    }, 1000);
  };
  const generateQuestion = () => {
    if (rangeSliderValue && typeof rangeSliderValue !== "number") {
      let min = rangeSliderValue[0];
      let max = rangeSliderValue[1];
      let p1 = Math.floor(Math.random() * (max - min + 1) + min);
      let p2 = Math.floor(Math.random() * tablesLength + 1);
      let currentRound = questions.length + 1;
      const newQuestions = [...questions];
      newQuestions.push({ p1, p2, answer: p1 * p2, round: currentRound });
      changeQuestions(newQuestions);
      changeTimeProgress(0);
      startTimer(currentRound);
    }
  };
  const handleStart = () => {
    changeGameStage(2);
    changeQuestions([]);
    changeInput("");
    changeScore(0);
    generateQuestion();
  };
  const handleStop = () => {
    changeGameStage(1);
  };
  const checkForCorrectAnswer = () => {
    let currentRound = questions.length;
    let answer = questions[currentRound - 1].answer;
    if (answer === parseInt(input)) {
      changeScore((oldScore) => oldScore + 1);
      changeInput("");
      if (currentRound < rounds) {
        generateQuestion();
      } else {
        changeGameStage(3);
      }
    }
  };
  const handleSkip = () => {
    let currentRound = questions.length;
    changeInput("");

    if (currentRound < rounds) {
      generateQuestion();
    } else {
      changeGameStage(3);
    }
  };
  // use effect
  // misc
  const darkTheme = createTheme({
    palette: {
      mode: currentThemePalette,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper className={styles.main} square>
        {gameStage === 1 && (
          <div className="Exercise-top">
            <Typography id="range-tables" gutterBottom>
              Range of multiplication tables
            </Typography>
            <Slider
              min={0}
              step={10}
              marks
              value={rangeSliderValue}
              onChange={(_, newValue) => changeRangeSliderValue(newValue)}
              valueLabelDisplay="auto"
              aria-labelledby="range-tables"
              getAriaValueText={(value) => value.toString()}
            />
            <Typography id="length-tables" gutterBottom>
              Length of multiplication tables
            </Typography>
            <Slider
              min={10}
              step={1}
              value={tablesLength}
              onChange={(_, newValue) =>
                typeof newValue === "number" && changeTablesLength(newValue)
              }
              valueLabelDisplay="auto"
              aria-labelledby="length-tables"
              getAriaValueText={(value) => value.toString()}
            />
            <Typography id="number-rounds" gutterBottom>
              Number of rounds
            </Typography>
            <Slider
              min={5}
              max={20}
              step={1}
              marks
              value={rounds}
              onChange={(_, newValue) =>
                typeof newValue === "number" && changeRounds(newValue)
              }
              valueLabelDisplay="auto"
              aria-labelledby="number-rounds"
              getAriaValueText={(value) => value.toString()}
            />
            <Typography id="time" gutterBottom>
              Time per round (seconds)
            </Typography>
            <Slider
              min={5}
              max={20}
              step={1}
              marks
              value={time}
              onChange={(_, newValue) =>
                typeof newValue === "number" && changeTime(newValue)
              }
              valueLabelDisplay="auto"
              aria-labelledby="time"
              getAriaValueText={(value) => value.toString()}
            />
            <Button variant="contained" color="primary" onClick={handleStart}>
              Start
            </Button>
          </div>
        )}
        {gameStage === 2 && (
          <div className="Exercise-bottom">
            <Button variant="contained" color="secondary" onClick={handleStop}>
              Stop
            </Button>
            <Card className="Exercise-card">
              <LinearProgress variant="determinate" value={timeProgress} />
              <CardContent>
                <Typography gutterBottom>
                  Round: {questions.length} / {rounds}
                </Typography>
                <Typography gutterBottom>
                  {questions[questions.length - 1].p1} X{" "}
                  {questions[questions.length - 1].p2}
                </Typography>
                <TextField
                  value={input}
                  onChange={(event) => {
                    changeInput(event.target.value);
                    checkForCorrectAnswer();
                  }}
                  className="Exercise-input"
                  inputProps={{ style: { textAlign: "center" } }}
                  type="number"
                />
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleSkip}>
                  Skip
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
        {gameStage === 3 && (
          <div className="Exercise-score">
            <Card className="Exercise-card">
              <CardContent>
                <Typography gutterBottom>
                  Your Score is {score} / {rounds}.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleStop}>
                  Continue
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
        <ThemeToggleFAB
          handleThemeToggle={handleThemeToggle}
          currentThemePalette={currentThemePalette}
        />
      </Paper>
    </ThemeProvider>
  );
}
