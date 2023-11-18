"use client";
import React from "react";
import LessonCard, { LessonCardHandler } from "./LessonCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConfirmLessons({ course }) {
  const [loading, setLoading] = React.useState(false);
  const lessonRefs = {};
  course.units.forEach((unit) => {
    unit.lessons.forEach((lesson) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      lessonRefs[lesson.id] = React.useRef(null);
    });
  });
  const [completedLessons, setCompletedLessons] = React.useState(new Set());
  const totalLessonsCount = React.useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.lessons.length;
    }, 0);
  }, [course.units]);
  console.log(totalLessonsCount, completedLessons.size);
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
                return (
                  <LessonCard
                    completedLessons={completedLessons}
                    setCompletedLessons={setCompletedLessons}
                    ref={lessonRefs[lesson.id]}
                    key={lesson.id}
                    lesson={lesson}
                    lessonIndex={lessonIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="mt-4 flex items-center justify-center">
        <div className="mx-4 flex items-center">
          <Link href="/create" className="">
            Back
          </Link>
          {totalLessonsCount === completedLessons.size ? (
            <Link className="" href={`/course/${course.id}/0/0`}>
              Save & Continue
            </Link>
          ) : (
            <Button
              type="button"
              className="ml-4 font-semibold"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                Object.values(lessonRefs).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
            >
              Generate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
