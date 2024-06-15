"use client";
import { useState } from "react";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import brandConfig from "@/config/brand";
import uiConfig from "@/config/ui";
import { CssBaseline, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "./page.module.css";

export default function Home() {
  // state
  const [currentThemePalette, changeCurrentThemePalette] = useState(
    uiConfig.defaultThemePalette
  );
  // functions
  const handleThemeToggle = () => {
    if (currentThemePalette === "dark") {
      changeCurrentThemePalette("light");
    } else {
      changeCurrentThemePalette("dark");
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
        <Typography>{brandConfig.name}</Typography>
        <ThemeToggleFAB
          handleThemeToggle={handleThemeToggle}
          currentThemePalette={currentThemePalette}
        />
      </Paper>
    </ThemeProvider>
  );
}
