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
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogTitle,
  LinearProgress,
  Paper,
  TextField,
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
        <Card className={styles.center}>
          <LinearProgress value={33} variant="determinate" />
          <CardHeader title="5 * 3 = " />
          <CardContent className={styles.content}>
            <TextField
              fullWidth
              autoFocus
              type="number"
              required
              label="answer"
            />
            <div className={styles.chips}>
              <Chip
                size="small"
                label="Lives Left: 2"
                icon={<FavoriteIcon />}
              />
              <Chip
                size="small"
                label="Current Score: 2"
                color="success"
                variant="outlined"
                icon={<SportsScoreIcon />}
              />
              <Chip
                size="small"
                label="Previous best score: 5"
                color="success"
                icon={<EmojiEventsIcon />}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="outlined">skip</Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => changeIsExitDialogOpen(true)}
            >
              exit
            </Button>
          </CardActions>
        </Card>
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
