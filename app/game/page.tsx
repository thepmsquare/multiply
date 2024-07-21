"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChangeEventHandler, useEffect, useState } from "react";
import { IoMdHeart, IoMdTrophy } from "react-icons/io";
import { MdSportsScore } from "react-icons/md";
import SlotCounter from "react-slot-counter";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import { Question, Questions } from "@/types/Questions";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

export default function Game() {
  // hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [question, changeQuestion] = useState<Question | null>(null);
  const [previousQuestions, changePreviousQuestions] = useState<Questions>([]);
  const [userInput, changeUserInput] = useState("");
  const [isTransitionVisible, changeIsTransitionVisible] = useState(false);
  const [livesLeft, changeLivesLeft] = useState(3);
  // functions
  const handleUserInputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!question) {
      return;
    }
    let newValue = e.target.value;
    let newValueInt = parseInt(newValue);
    if (newValueInt === question.correctAnswer) {
      changeUserInput("");
      let nextRound = previousQuestions.length + 1;
      let newPreviousQuestions: Questions = JSON.parse(
        JSON.stringify(previousQuestions)
      );
      let questionClone: Question = JSON.parse(JSON.stringify(question));
      questionClone.givenAnswer = newValueInt;
      newPreviousQuestions.push(questionClone);
      changePreviousQuestions(newPreviousQuestions);
      changeQuestion(getQuestion(nextRound));
      // changeIsTransitionVisible(true);
      // setTimeout(() => {
      //   changeQuestion(getQuestion(nextRound));
      // }, 1000);

      // setTimeout(() => {
      //   changeIsTransitionVisible(false);
      // }, 2000);
    } else {
      changeUserInput(newValue);
    }
  };
  const getQuestion = (round: number) => {
    const p1 = Math.floor(Math.random() * 10) + 1;
    const p2 = Math.floor(Math.random() * 10) + 1;
    let question: Question = {
      p1,
      p2,
      correctAnswer: p1 * p2,
      givenAnswer: null,
      round,
    };

    return question;
  };
  // use effect
  useEffect(() => {
    changeQuestion(getQuestion(1));
  }, []);

  // misc

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="max-w-[80%]">
        <AnimatePresence>
          {isTransitionVisible && (
            <motion.div
              className="z-20 h-full w-full flex items-center justify-center bg-success absolute"
              initial={{ y: 1000 }}
              animate={{ y: -1000 }}
              transition={{
                duration: 2,
              }}
            >
              hello
            </motion.div>
          )}
        </AnimatePresence>
        <CardHeader className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            startContent={<IoMdHeart className="text-danger text-xl" />}
            className="col-span-2 md:col-span-1"
          >
            lives: <SlotCounter value={livesLeft} useMonospaceWidth />
          </Button>
          <Button startContent={<MdSportsScore className="text-xl" />}>
            score:{" "}
            <SlotCounter value={previousQuestions.length} useMonospaceWidth />
          </Button>
          <Button
            startContent={<IoMdTrophy className="text-success text-xl" />}
          >
            high score: <SlotCounter value={7} useMonospaceWidth />
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-10 py-10 w-4/5 mx-auto text-center">
          {question ? (
            <SlotCounter
              value={`${question.p1} * ${question.p2} = `}
              charClassName="text-3xl m-1"
              useMonospaceWidth
            />
          ) : (
            <Spinner />
          )}
          <Input
            type="number"
            label="your answer"
            autoFocus
            value={userInput}
            onChange={handleUserInputOnChange}
          />

          <Progress aria-label="Loading..." value={60} className="max-w-md" />
        </CardBody>
        <Divider />
        <CardFooter className="flex gap-4">
          <Button className="w-full">skip</Button>
          <Button color="danger" className="w-full" onPress={onOpen}>
            exit
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                confirmation for exit
              </ModalHeader>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  cancel
                </Button>
                <Link href="/">
                  <Button color="danger">exit</Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ThemeToggleFAB />
    </div>
  );
}
