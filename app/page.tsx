"use client";

import Link from "next/link";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import { Button } from "@nextui-org/react";

export default function Home() {
  // state

  // functions

  // use effect

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Link href="/game">
        <Button color="primary">start</Button>
      </Link>
      <ThemeToggleFAB />
    </div>
  );
}
