import { NextResponse } from "next/server";
import strict_output from "@/lib/gpt";

import prisma from "@/lib/db";

import { getAuthSession } from "@/lib/auth";

export async function POST(req, res) {
  try {
    const session = await getAuthSession(req);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseTheme, answers } = await req.json();
    let output_units = await strict_output(
      "You are an AI capable of curating course content",
      `You are an AI capable of curating course content, generating relevant chapter titles, and identifying pertinent YouTube videos for each chapter. Your task is to design a course about ${courseTheme}. Consider the following 5 questions and the user's responses (you will get an array with 5 objects, each containing the question and it s answer) : ${answers}. For each chapter, provide a detailed YouTube search query that can be used to locate an informative and educational video. Each query should yield an educational and informative YouTube lesson.`,
      {
        course:
          "an array of objects, each object containg the unit title (unitTitle) and a lessons array, each lesson from the lessons array should have a youtube_search_query and a lesson_title key in the JSON object",
      },
    );

    console.log(output_units.course);

    const course = await prisma.course.create({
      data: {
        name: courseTheme,
        userId: session.id,
      },
    });

    for (const unit of output_units.course) {
      const title = unit.unitTitle;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      await prisma.lesson.createMany({
        data: unit.lessons.map((lesson) => {
          return {
            name: lesson.lesson_title,
            youtubeSearchQuery: lesson.youtube_search_query,
            unitId: prismaUnit.id,
          };
        }),
      });
    }

    return NextResponse.json(output_units);
  } catch (err) {
    console.log(err);
    return NextResponse({ message: "NOT OK" }, { status: 400 });
  }
}
