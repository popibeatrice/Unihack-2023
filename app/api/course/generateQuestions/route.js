// /api/course/generateQuestions

import { NextResponse } from "next/server";
import strict_output from "@/lib/gpt";
import { getAuthSession } from "@/lib/auth";

export async function POST(req, res) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    let output_units = await strict_output(
      "You are an AI capable of curating course content",
      `You are an AI capable of curating course content, for this you need more info about the topic so you can create a more tailored experience. The user will give you a topic they want to learn about. What five questions would you give him to better understand his needs or his level or any important details so you can create a better course, with units and chapters. The questions will not be related to the learning preference of the user(books, videos etc.) or the learning style. The questions will be short and condensed, no more than 20 words each. User input is : ${body.courseTheme}`,
      { questions: "an array of 5 questions" },
    );
    console.log(output_units);
    return NextResponse.json(output_units);
  } catch (err) {
    console.log("problema este:");
    console.error(err);

    return new NextResponse(err.message, { status: 400 });
  }
}
