"use client";
import { useEffect, useState } from "react";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import localStorageVariablesConfig from "@/configs/localStorageVariables";
import uiConfig from "@/configs/ui";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CssBaseline,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "./page.module.css";

import type { PaletteOptions } from "@mui/material/styles";
export default function Game() {
  // state
  const [currentThemePalette, changeCurrentThemePalette] = useState<
    PaletteOptions["mode"]
  >(uiConfig.defaultThemePalette);
  // functions
  const handleThemeToggle = () => {
    let newThemePalette: PaletteOptions["mode"] =
      currentThemePalette === "light" ? "dark" : "light";
    changeCurrentThemePalette(newThemePalette);
    window.localStorage.setItem(
      localStorageVariablesConfig.themePaletteKeyName,
      newThemePalette
    );
  };
  // use effect
  useEffect(() => {
    // load from local storage
    let savedThemePalette = window.localStorage.getItem(
      localStorageVariablesConfig.themePaletteKeyName
    );
    let selectedThemePalette: PaletteOptions["mode"];
    if (savedThemePalette) {
      selectedThemePalette = savedThemePalette as PaletteOptions["mode"];
    } else {
      selectedThemePalette = uiConfig.defaultThemePalette;
      if (uiConfig.defaultThemePalette) {
        window.localStorage.setItem(
          localStorageVariablesConfig.themePaletteKeyName,
          uiConfig.defaultThemePalette
        );
      } else {
        // pass
      }
    }
    changeCurrentThemePalette(selectedThemePalette);
  }, []);
  // misc
  const theme = createTheme({
    palette: {
      mode: currentThemePalette,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={styles.main} square>
        <Card className={styles.center}>
          <LinearProgress value={33} variant="determinate" />
          <CardHeader title="5 * 3 = " />
          <CardContent>
            <TextField
              fullWidth
              autoFocus
              type="number"
              required
              label="answer"
            />
          </CardContent>
          <CardActions>
            <Button>skip</Button>
          </CardActions>
        </Card>
      </Paper>
      <ThemeToggleFAB
        handleThemeToggle={handleThemeToggle}
        currentThemePalette={currentThemePalette}
      />
    </ThemeProvider>
  );
}
