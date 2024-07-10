"use client";

import Link from "next/link";

import ThemeToggleFAB from "@/components/ThemeToggleFAB";
import brandConfig from "@/configs/brand";
import personalDetailsConfig from "@/configs/personalDetails";
import multiplyImage from "@/public/static/multiply.svg";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link as LinkUI,
} from "@nextui-org/react";

export default function Home() {
  // state

  // functions

  // use effect
  // misc
  console.log(multiplyImage);
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="max-w-[80%]">
        <CardHeader className="flex gap-3">
          <Image
            alt="main logo"
            height={40}
            radius="sm"
            src={multiplyImage.src}
            width={40}
          />
          <p className="text-md">{brandConfig.name}</p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-10 py-10 w-4/5 mx-auto">
          <p className="text-center">{brandConfig.description}</p>
          <Link href="/game">
            <Button color="primary" className="w-full">
              start
            </Button>
          </Link>
        </CardBody>
        <Divider />
        <CardFooter>
          <LinkUI isExternal showAnchorIcon href={personalDetailsConfig.link}>
            developed by {personalDetailsConfig.username}
          </LinkUI>
        </CardFooter>
      </Card>

      <ThemeToggleFAB />
    </div>
  );
}
