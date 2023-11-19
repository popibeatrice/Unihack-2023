// /api/course/generateCourse

import { getAuthSession } from "@/lib/auth";

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
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { lessonId } = await req.json();

    console.log(lessonId);

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    console.log(lesson);

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
      "summarise the youtube transcript in maximum 150 words, BE BRIEF. Do not mention the creators name or any giveaways or promo codes they do. Do not talk of the sponsors, or anything unrelated to the main topic, BE BRIEF, also do not introduce what the summary is about.\n" +
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
    console.log(error);

    return NextResponse.json(
      {
        message: "NOT OK",
      },
      { status: 500 },
    );
  }
}
