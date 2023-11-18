import CourseCard from "@/components/client/CourseCard";

import { getAuthSession } from "@/lib/auth";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";

async function getCourses(session) {
  try {
    if (!session) {
      return redirect("/");
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

    if (!user) {
      return null;
    }

    return user.courses;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Gallery() {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }

  const courses = await getCourses(session);

  console.log(courses[0].units);

  return (
    <main className="flex min-h-[calc(100vh_-_175px)] w-full flex-col items-center justify-start gap-32">
      <h1 className="w-[90%] text-center text-4xl font-light sm:text-5xl md:text-6xl">
        Your <span className="font-handwrite text-primary">courses</span>
      </h1>
      <div className="grid w-[90%]">
        {/* {courses.map((course) => {
          return <span key={course.id}>{course.name}</span>;
        })} */}
      </div>
    </main>
  );
}
