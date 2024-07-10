"use client";

import { IoMdHeart, IoMdTrophy } from "react-icons/io";
import { MdSportsScore } from "react-icons/md";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Progress,
} from "@nextui-org/react";
import { semanticColors } from "@nextui-org/theme";

export default function Game() {
  // state

  // functions

  // use effect

  // misc

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="max-w-[80%]">
        <CardHeader className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            startContent={<IoMdHeart className="text-danger text-xl" />}
            className="col-span-2 md:col-span-1"
          >
            lives: 2
          </Button>
          <Button startContent={<MdSportsScore className="text-xl" />}>
            score: 4
          </Button>
          <Button
            startContent={<IoMdTrophy className="text-success text-xl" />}
          >
            high score: 7
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-10 py-10 w-4/5 mx-auto">
          <p className="text-center text-3xl">5 * 3 = </p>
          <Input type="number" label="your answer" autoFocus />
          <Progress aria-label="Loading..." value={60} className="max-w-md" />
        </CardBody>
        <Divider />
        <CardFooter className="flex gap-4">
          <Button className="w-full">skip</Button>
          <Button color="danger" className="w-full">
            exit
          </Button>
        </CardFooter>
      </Card>

      <ThemeToggleFAB />
    </div>
  );
}
