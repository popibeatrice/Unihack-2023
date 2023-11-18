"use client";

import LessonCard from "./LessonCard";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export default function ConfirmLessons({ course }) {
  async function handleSubmit() {
    const promises = [];
    try {
      for (const unit of course.units)
        for (const lesson of unit.lessons) {
          promises.push(
            axios.post("/api/course/generateCourse", {
              lessonId: lesson.id,
            }),
          );
        }
      const res = await Promise.all(promises);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-4 w-full">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className="mt-3">
              {unit.lessons.map((lesson, lessonIndex) => {
                return <LessonCard key={lesson.id} lesson={lesson} />;
              })}
            </div>
          </div>
        );
      })}
      <div className="mt-4 flex items-center justify-center">
        <div className="mx-4 flex items-center">
          <Link
            href="/dashboard/createCourse"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            Back
          </Link>
          <Button
            type="button"
            className="ml-4 font-semibold"
            onClick={handleSubmit}
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
