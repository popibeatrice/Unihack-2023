"use client";

export default function ChapterCard({ lesson }) {
  return (
    <div
      key={lesson.id}
      className="mt-2 flex justify-between rounded bg-secondary px-4 py-2"
    >
      <h5>{lesson.name}</h5>
    </div>
  );
}
