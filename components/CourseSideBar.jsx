import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

const CourseSideBar = async ({ course, currentLessonId }) => {
  return (
    <div className="absolute top-1/2 w-[400px] -translate-y-1/2 rounded-r-3xl bg-secondary p-6">
      <h1 className="text-4xl font-bold">{course.name}</h1>
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-4">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h2 className="text-2xl font-bold">{unit.name}</h2>
            {unit.lessons.map((lesson, lessonIndex) => {
              return (
                <div key={lesson.id}>
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${lessonIndex}`}
                    className={cn("text-secondary-foreground/60", {
                      "font-bold text-green-500": lesson.id === currentLessonId,
                    })}
                  >
                    {lesson.name}
                  </Link>
                </div>
              );
            })}
            <Separator className="mt-2 bg-gray-500 text-gray-500" />
          </div>
        );
      })}
    </div>
  );
};

export default CourseSideBar;
