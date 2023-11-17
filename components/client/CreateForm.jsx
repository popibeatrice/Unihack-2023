"use client";

import axios from "axios";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState } from "react";

let courseTheme;

const formSchema = z.object({
  topic: z
    .string()
    .min(2, {
      message: "Topic must be at least 2 characters.",
    })
    .max(100, {
      message: "Topic must be less than 100 characters.",
    }),
});

export default function CreateForm({
  generatedQuestions,
  setGeneratedQuestions,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(values) {
    if (!generatedQuestions || generatedQuestions.length === 0) {
      try {
        setIsLoading(true);
        courseTheme = values.topic;
        const res = await axios.post("/api/course/generateQuestions", {
          courseTheme,
        });
        setGeneratedQuestions(res.data.questions);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else if (currentQuestion < generatedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswers([
        ...answers,
        { question: generatedQuestions[currentQuestion], answer: values.topic },
      ]);
    } else {
      setAnswers([
        ...answers,
        { question: generatedQuestions[currentQuestion], answer: values.topic },
      ]);
      console.log(answers, {
        question: generatedQuestions[currentQuestion],
        answer: values.topic,
      });
      try {
        answers.push({
          question: generatedQuestions[currentQuestion],
          answer: values.topic,
        });
        console.log(answers);
        const res = await axios.post("/api/course/generateCourse", {
          courseTheme,
          answers,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        {generatedQuestions && generatedQuestions.length > 0 ? (
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem className="flex max-w-2xl flex-col gap-4">
                <FormLabel className="flex flex-col gap-1">
                  <p className="text-xl sm:text-2xl">
                    {generatedQuestions[currentQuestion]}
                  </p>
                  <p className="">
                    <span className="text-primary">&#9432;</span> Lorem ipsum
                    dolor sit amet consectetur adipisicing elit.{" "}
                  </p>
                </FormLabel>
                <FormControl>
                  <Input placeholder="your response" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem className="flex max-w-2xl flex-col gap-4">
                <FormLabel className="flex flex-col gap-1">
                  <p className="text-xl sm:text-2xl">Topic</p>
                  <p>
                    <span className="text-primary">&#9432;</span> Lorem ipsum
                    dolor sit amet consectetur adipisicing elit.{" "}
                  </p>
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-14"
                    placeholder="ex: playing the guitar"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {generatedQuestions && generatedQuestions.length > 0 ? (
          <Button type="submit">
            {currentQuestion < generatedQuestions.length - 1
              ? "Next"
              : "Submit"}
          </Button>
        ) : (
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
