"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import brandConfig from "@/configs/brand";
import localStorageVariablesConfig from "@/configs/localStorageVariables";
import uiConfig from "@/configs/ui";
import { Button, CssBaseline, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styles from "./page.module.css";

import type { PaletteOptions } from "@mui/material/styles";
export default function Home() {
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
        <div className={styles.center}>
          <Typography color="primary" variant="h2" component="h1">
            {brandConfig.name}
          </Typography>
          <Typography>{brandConfig.description}</Typography>
          <Link href="/game">
            <Button variant="contained" size="large" fullWidth>
              Start
            </Button>
          </Link>
        </div>
      </Paper>
      <ThemeToggleFAB
        handleThemeToggle={handleThemeToggle}
        currentThemePalette={currentThemePalette}
      />
    </ThemeProvider>
  );
}
