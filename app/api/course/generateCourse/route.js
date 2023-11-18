// /api/course/generateCourse

import prisma from "@/lib/db";
import strict_output from "@/lib/gpt";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { lessonId } = await req.json();

    console.log(lessonId);

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });
    if (!lesson) {
      return NextResponse.json(
        {
          message: "NOT OK",
        },
        { status: 404 },
      );
    }
    const videoId = await searchYoutube(lesson.youtubeSearchQuery);
    let transcript = await getTranscript(videoId);
    let maxLength = 200;
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    const { summary } = await strict_output(
      "You are an AI capable of summarising a youtube transcript",
      "summarise in 100 words or less and do not talk of the sponsors or anything unrelated to the main topic, BE BRIEF, also do not introduce what the summary is about.\n" +
        transcript,
      { summary: "summary of the transcript" },
    );

    console.log("SUMMARY", summary);

    const questions = await getQuestionsFromTranscript(summary, lesson.name);

    console.log("QUESTIONS", questions);

    await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          correctAnswer: question.answer,
          answers: JSON.stringify(options),
          lessonId: lessonId,
        };
      }),
    });

    await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        youtubeVideoId: videoId,
        summary: summary,
      },
    });
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "NOT OK",
      },
      { status: 500 },
    );
  }
}
