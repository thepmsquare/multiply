"use client";

import Link from "next/link";
import { useState } from "react";
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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  useDisclosure,
} from "@nextui-org/react";

export default function Game() {
  // state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
