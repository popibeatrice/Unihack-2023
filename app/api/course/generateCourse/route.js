import { NextResponse } from "next/server";
import strict_output from "@/lib/gpt";

export async function POST(req, res) {
  try {
    const body = await req.json();
    let output_units = await strict_output(
      "You are an AI capable of curating course content",
      `You are an AI capable of curating course content, generating relevant chapter titles, and identifying pertinent YouTube videos for each chapter. Your task is to design a course about ${body.courseTheme}. Consider the following 5 questions and the user's responses (you will get an array with 5 objects, each containing the question and it s answer) : ${body.QandA}. For each chapter, provide a detailed YouTube search query that can be used to locate an informative and educational video. Each query should yield an educational and informative YouTube lesson.`,
      {
        course:
          "an array of objects, each object containg the unit title (unitTitle) and a lessons array, each lesson from the lessons array should have a youtube_search_query and a lesson_title key in the JSON object",
      },
    );
    console.log(output_units);
    return NextResponse.json(output_units);
  } catch (err) {
    console.log("problema este:");
    console.error(err);

    return new NextResponse(err.message, { status: 400 });
  }
}
