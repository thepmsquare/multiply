"use client";

import Link from "next/link";
import {
  ChangeEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [userInput, changeUserInput] = useState("");
  const [isTransitionVisible, changeIsTransitionVisible] = useState(false);
  const [livesLeft, changeLivesLeft] = useState(3);
  const [currentRound, changeCurrentRound] = useState(0);
  const [score, changeScore] = useState(0);
  const [timeLeft, changeTimeLeft] = useState(10000);
  const [allowedTime, changeAllowedTime] = useState(10000);
  const [isEnd, changeIsEnd] = useState(false);
  const timerId: MutableRefObject<null | NodeJS.Timeout> = useRef(null);

  // functions
  const handleUserInputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!question) {
      return;
    }
    let newValue = e.target.value;
    let newValueInt = parseInt(newValue);
    if (newValueInt === question.correctAnswer) {
      changeUserInput("");
      let nextRound = currentRound + 1;
      changeCurrentRound(nextRound);
      changeScore(score + 1);
      changeIsTransitionVisible(true);
      if (timerId.current) {
        clearInterval(timerId.current);
      }
      setTimeout(() => {
        changeIsTransitionVisible(false);
        changeQuestion(getQuestion(nextRound));
        changeAllowedTime(10000);
        changeTimeLeft(10000);

        timerId.current = setInterval(() => {
          changeTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
        }, 1000);
      }, 1200);
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

  const handleSkip = () => {
    if (livesLeft > 1) {
      changeLivesLeft(livesLeft - 1);
      changeUserInput("");
      let nextRound = currentRound + 1;
      changeIsTransitionVisible(true);
      if (timerId.current) {
        clearInterval(timerId.current);
      }
      setTimeout(() => {
        changeIsTransitionVisible(false);
        changeCurrentRound(nextRound);
        changeQuestion(getQuestion(nextRound));

        changeAllowedTime(10000);
        changeTimeLeft(10000);

        timerId.current = setInterval(() => {
          changeTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
        }, 1000);
      }, 1200);
    } else {
      // handle game end
      changeIsTransitionVisible(true);
      setTimeout(() => {
        changeIsTransitionVisible(false);
        changeIsEnd(true);
      }, 1200);
    }
  };

  // use effect
  useEffect(() => {
    if (timeLeft <= 0 && timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
      handleSkip();
    }
  }, [timeLeft]);

  useEffect(() => {
    changeCurrentRound(1);
    changeQuestion(getQuestion(currentRound));
    if (!timerId.current) {
      timerId.current = setInterval(() => {
        changeTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
      }, 1000);
    }
  }, []);

  // misc

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {!isEnd ? (
        <>
          <Card className="max-w-[80%]">
            <CardHeader className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Button
                startContent={<IoMdHeart className="text-danger text-xl" />}
                className="col-span-2 md:col-span-1"
              >
                lives: <SlotCounter value={livesLeft} />
              </Button>
              <Button startContent={<MdSportsScore className="text-xl" />}>
                score: <SlotCounter value={score} />
              </Button>
              <Button
                startContent={<IoMdTrophy className="text-success text-xl" />}
              >
                high score: <SlotCounter value={7} />
              </Button>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-10 py-10 w-4/5 mx-auto text-center">
              <p>Round: {currentRound}</p>
              {question ? (
                <div className="flex justify-center">
                  <SlotCounter
                    value={`${question.p1} * ${question.p2} = `}
                    charClassName="text-3xl m-1"
                  />

                  <SlotCounter
                    value={isTransitionVisible ? question.correctAnswer : "?"}
                    charClassName={`text-3xl m-1 ${
                      isTransitionVisible ? "text-success" : ""
                    }`}
                  />
                </div>
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
              <Progress
                aria-label="Loading..."
                value={(timeLeft / allowedTime) * 100}
                className="max-w-md"
              />
            </CardBody>
            <Divider />
            <CardFooter className="flex gap-4">
              <Button className="w-full" onPress={handleSkip}>
                skip
              </Button>
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
        </>
      ) : (
        <Card className="max-w-[80%]">
          <CardHeader>the end</CardHeader>
          <CardBody className="flex flex-col text-center">
            your score: {score}
          </CardBody>
          <CardFooter>
            <Link href="/">
              <Button color="danger">exit</Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      <ThemeToggleFAB />
    </div>
  );
}
