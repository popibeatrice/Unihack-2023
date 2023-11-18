import CourseSideBar from "@/components/CourseSideBar";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const CoursePage = async ({ params: { slug } }) => {
  const [courseId, unitIndexParam, lessonIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          lessons: {
            include: { questions: true },
          },
        },
      },
    },
  });
  if (!course) {
    return redirect("/");
  }
  let unitIndex = parseInt(unitIndexParam);
  let lessonIndex = parseInt(lessonIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/");
  }
  const lesson = unit.lessons[lessonIndex];
  if (!lesson) {
    return redirect("/");
  }
  const nextLesson = unit.lessons[lessonIndex + 1];
  const prevLesson = unit.lessons[lessonIndex - 1];
  return (
    <div>
      <CourseSideBar course={course} currentLessonId={lesson.id} />;
      <div>
        <div className="ml-[400px] px-8">
          <div className="flex">
            <MainVideoSummary
              lesson={lesson}
              lessonIndex={lessonIndex}
              unit={unit}
              unitIndex={unitIndex}
            />
            <QuizCards lesson={lesson} />
          </div>

          <div className="mt-4 h-[1px] flex-[1] bg-gray-500 text-gray-500" />
          <div className="flex pb-8">
            {prevChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${lessonIndex - 1}`}
                className="mr-auto mt-4 flex w-fit"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Previous
                    </span>
                    <span className="text-xl font-bold">{prevLesson.name}</span>
                  </div>
                </div>
              </Link>
            )}

            {nextLesson && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${lessonIndex + 1}`}
                className="ml-auto mt-4 flex w-fit"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Next
                    </span>
                    <span className="text-xl font-bold">{nextLesson.name}</span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
