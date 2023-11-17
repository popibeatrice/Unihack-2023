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
      "You are an AI capable of creating questions that can help create more context for curating a course",
      `Your only task is to craft five questions that the user must answer to help you, the AI, understand what the use's needs are. Your questions should begin by assuming no prior knowledge about the topic the user wishes to learn, gradually progressing to more specific questions pertaining to the topic to effectively address the user's unique learning requirements in the context of learning the topic. These five questions should be concise and succinct, not exceeding 20 words each. The questions must have the intention to help understand exactly what type of course the user needs, they can be simmilar to something like: "Do you have any prior knowledge about the topic?" or "What is the final goal of learning about this topic?". The questions should not ask about the user's preferred learning method, so the questions should not ask if the user wants to learn by reading, watching videos or other ways, that is because the course he will watch will be in video format. The generation should be quick and fast. The user seeks to learn about: ${body.courseTheme}`,
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
