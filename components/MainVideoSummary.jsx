import React from "react";

const MainVideoSummary = ({ unit, unitIndex, lesson, lessonIndex }) => {
  return (
    <div className="mt-16 flex-[2]">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} &bull; Lesson {lessonIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{lesson.name}</h1>
      <iframe
        title="lesson video"
        className="aspeect-video mt-4 max-h-[24rem] w-full"
        src={`https://www.youtube.com/embed/${lesson.youtubeVideoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Summary</h3>
        <p className="mt-2 text-secondary-foreground/80">{lesson.summary}</p>
      </div>
    </div>
  );
};

export default MainVideoSummary;
