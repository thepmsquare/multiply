import styles from "@/components/stylesheets/ThemeToggleFAB.module.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Fab } from "@mui/material";

import type { PaletteOptions } from "@mui/material/styles";
function ThemeToggleFAB(props: {
  handleThemeToggle: () => void;
  currentThemePalette: PaletteOptions["mode"];
}) {
  return (
    <Fab
      onClick={props.handleThemeToggle}
      className={styles.main}
      color="primary"
    >
      {props.currentThemePalette === "light" ? (
        <DarkModeIcon />
      ) : (
        <LightModeIcon />
      )}
    </Fab>
  );
}

export default ThemeToggleFAB;
