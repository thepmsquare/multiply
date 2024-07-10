"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import localStorageVariablesConfig from "@/configs/localStorageVariables";
import uiConfig from "@/configs/ui";

import styles from "./page.module.css";

export default function Game() {
  // state
  const [currentThemePalette, changeCurrentThemePalette] = useState(
    uiConfig.defaultThemePalette
  );
  const [isExitDialogOpen, changeIsExitDialogOpen] = useState(false);
  // functions
  const handleThemeToggle = () => {
    let newThemePalette = currentThemePalette === "light" ? "dark" : "light";
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
    let selectedThemePalette;
    if (savedThemePalette) {
      selectedThemePalette = savedThemePalette;
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

  return <div>hi</div>;
}
