import prisma from "@/lib/db";
import strict_output from "@/lib/gpt";
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

    const { lessons } = await req.json();

    console.log("Suntem in endpoint");

    for (const lesson of lessons) {
      const { name, youtubeSearchQuery, id } = lesson;

      const lessonCheck = await prisma.lesson.findUnique({
        where: {
          id,
        },
      });
      if (!lessonCheck) {
        return NextResponse.json(
          {
            message: "Lesson not found",
          },
          { status: 404 },
        );
      }

      const videoId = await searchYoutube(youtubeSearchQuery);
      let transcript = await getTranscript(videoId);
      let maxLength = 50;
      transcript = transcript.split(" ").slice(0, maxLength).join(" ");

      const output_summary = await strict_output(
        "You are an AI capable of summarising a youtube transcript",
        `summarise in 50 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about.BE CONCISE AND SHORT TO THE POINT: ${transcript}`,
        { summary: "summary of the transcript" },
      );
      console.log(output_summary);

      // await prisma.question.createMany({
      //   data: questions.map((question) => {
      //     let options = [
      //       question.answer,
      //       question.option1,
      //       question.option2,
      //       question.option3,
      //     ];
      //     options = options.sort(() => Math.random() - 0.5);
      //     return {
      //       question: question.question,
      //       answer: question.answer,
      //       options: JSON.stringify(options),
      //       lessonId: id,
      //     };
      //   }),
      // });

      // await prisma.lesson.update({
      //   where: { id },
      //   data: {
      //     videoId,
      //     summary,
      //   },
      // });
    }
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        messaage: "NOT OK",
      },
      { status: 500 },
    );
  }
}
