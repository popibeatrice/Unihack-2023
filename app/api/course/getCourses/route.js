// /api/course/getCourses

import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

import prisma from "@/lib/db";

export async function GET(req, res) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
      include: {
        courses: {
          include: {
            units: true,
          },
        },
      },
    });

    console.log(user);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "NOT OK" }, { status: 400 });
  }
}
