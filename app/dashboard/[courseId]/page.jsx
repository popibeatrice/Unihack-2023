import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/db";

// import YoutubeVideo from "@/components/YoutubeVideo";

async function getCourse(session, courseId) {
  try {
    if (!session) {
      return redirect("/");
    }
    console.log(courseId);
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        units: {
          include: {
            lessons: true,
          },
        },
      },
    });
    console.log(course.name);
    if (!course) {
      return null;
    }
    return course;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function TheChosenCourse({ params: { courseId } }) {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }
  const course = await getCourse(session, courseId);
  const transformedString =
    course.name.charAt(0).toUpperCase() + course.name.slice(1);
  return (
    <main className="flex flex-col items-center justify-start">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-4xl font-light sm:text-5xl md:text-6xl">
          {transformedString}
        </h1>
        <div className="flex w-full flex-row-reverse items-center justify-between gap-3">
          <div className="flex items-center justify-start gap-2">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span className="tracking-wide">Not completed</span>
          </div>
          <span>{course.units.length} CHAPTERS</span>
        </div>
      </div>
      {/* <YoutubeVideo videoLink="https://www.youtube.com/watch?v=9jU8PJ4gPVw&ab_channel=Calisthenicmovement" /> */}
    </main>
  );
}
