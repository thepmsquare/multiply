import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";

function ThemeToggleFAB() {
  // state
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // functions
  const handleThemeToggle = () => {
    let newThemePalette = theme === "light" ? "dark" : "light";
    setTheme(newThemePalette);
  };
  // use effect
  useEffect(() => {
    setMounted(true);
  }, []);
  // misc
  if (!mounted) return null;
  return (
    <Button onClick={handleThemeToggle} className="fixed bottom-4 right-4">
      toggle theme
    </Button>
  );
}

export default ThemeToggleFAB;
