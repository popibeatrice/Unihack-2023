import { getAuthSession } from "@/lib/auth";
import VideoZone from "@/components/VideoZone";
import prisma from "@/lib/db";

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
    <main className="flex w-full flex-col items-center justify-start gap-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-4xl font-light sm:text-5xl md:text-6xl">
          {transformedString}
        </h1>
        <div className="flex w-full flex-row items-center justify-between gap-3 md:justify-start md:gap-5">
          <span>{course.units.length} CHAPTERS</span>
          <div className="flex items-center justify-start gap-2">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span className="tracking-wide">Not completed</span>
          </div>
        </div>
      </div>
      <div className="flex w-[90%] flex-col items-center justify-center gap-10">
        <div className="flex w-full items-center justify-center gap-10">
          <VideoZone />
          <div className="w-full max-w-xl self-stretch rounded-xl bg-zinc-800 p-5">
            <h2 className="text-xl">Content</h2>
            <div className="bg-zinc-700">
              <ul>
                <li>aaa</li>
                <li>ccc</li>
                <li>ccc</li>
                <li>ccc</li>
                <li>ccc</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1192px] rounded-xl bg-zinc-800 p-5 2xl:max-w-[1384px]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
            omnis soluta? Et iste laborum labore. Labore, corrupti sequi
            temporibus ea, velit magnam numquam nemo nihil eum quaerat in
            ducimus rerum.
          </p>
        </div>
      </div>
    </main>
  );
}
