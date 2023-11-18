function VideoZone() {
  return (
    <div className="flex w-full max-w-xl flex-col items-center justify-center gap-5 2xl:max-w-3xl">
      <iframe
        title="chapter video"
        className="mt-4 aspect-video h-auto w-full rounded-2xl bg-zinc-800 p-5"
        src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
        allowFullScreen
      />
      <div className="flex w-full items-center justify-between rounded-xl bg-zinc-800 p-3">
        <button className=" flex items-center justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
          Prev
        </button>
        <h2>Lesson Title</h2>
        <button className=" flex items-center justify-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
          Next
        </button>
      </div>
    </div>
  );
}

export default VideoZone;
