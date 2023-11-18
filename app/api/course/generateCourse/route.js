import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";
import { NextResponse } from "next/server";

import { getAuthSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { lessonId } = await req.json();
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });
    if (!lesson) {
      return NextResponse.json(
        {
          message: "Lesson not found",
        },
        { status: 404 },
      );
    }
    const videoId = await searchYoutube(lesson.youtubeSearchQuery);
    let transcript = await getTranscript(videoId);
    let maxLength = 500;
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    const { summary } = await strict_output(
      "You are an AI capable of summarising a youtube transcript",
      "summarise in 250 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about.\n" +
        transcript,
      { summary: "summary of the transcript" },
    );

    const questions = await getQuestionsFromTranscript(transcript, lesson.name);

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
          answer: question.answer,
          options: JSON.stringify(options),
          lessonId: lessonId,
        };
      }),
    });

    await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        videoId: videoId,
        summary: summary,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        messaage: "NOT OK",
      },
      { status: 500 },
    );
  }
}
