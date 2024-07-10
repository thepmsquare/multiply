"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import localStorageVariablesConfig from "@/configs/localStorageVariables";
import uiConfig from "@/configs/ui";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogTitle,
  LinearProgress,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "./page.module.css";

import type { PaletteOptions } from "@mui/material/styles";
export default function Game() {
  // state
  const [currentThemePalette, changeCurrentThemePalette] = useState<
    PaletteOptions["mode"]
  >(uiConfig.defaultThemePalette);
  const [isExitDialogOpen, changeIsExitDialogOpen] = useState(false);
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
        <div className={styles.content}>
          <div className={styles.chips}>
            <Button
              variant="contained"
              startIcon={<EmojiEventsIcon />}
              color="primary"
            >
              Previous best score: 5
            </Button>
            <Button
              color="success"
              variant="outlined"
              startIcon={<SportsScoreIcon />}
            >
              Current Score: 2
            </Button>
            <Button
              startIcon={<FavoriteIcon />}
              color="error"
              variant="outlined"
            >
              Lives Left: 2
            </Button>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <Typography
                className={styles.cardTitle}
                variant="h3"
                component="h2"
              >
                5 * 3
              </Typography>
              <LinearProgress
                value={33}
                variant="determinate"
                className={styles.progressBar}
              />

              <TextField fullWidth autoFocus type="number" label="answer" />

              <div className={styles.cardActions}>
                <Button variant="outlined">skip</Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => changeIsExitDialogOpen(true)}
                >
                  exit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <Dialog
        open={isExitDialogOpen}
        onClose={() => changeIsExitDialogOpen(false)}
        aria-labelledby="exit-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to exit?
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => changeIsExitDialogOpen(false)}>Cancel</Button>
          <Link href="/">
            <Button autoFocus color="error">
              Yes
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <ThemeToggleFAB
        handleThemeToggle={handleThemeToggle}
        currentThemePalette={currentThemePalette}
      />
    </ThemeProvider>
  );
}
