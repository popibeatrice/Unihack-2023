import Link from "next/link";

const cardStyle = {
  borderImage: "linear-gradient(to right, #fa7415, #facc15) 1",
};

export default function CourseCard() {
  return (
    <div
      style={cardStyle}
      className="flex max-w-lg flex-col gap-6 border-[3px] border-solid bg-zinc-800 p-5"
    >
      <div className="flex w-full flex-col items-start justify-center gap-3">
        <div>
          <h2 className="text-3xl">JavaScript Course</h2>
          <p className="text-sm font-light">4 CHAPTERS</p>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center justify-start gap-2">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span className="tracking-wide">Not completed</span>
          </div>
          <Link
            className="flex w-full items-center justify-start gap-1 font-medium  text-primary sm:justify-end"
            href="/"
          >
            Jump back in
            <CardSVG />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CardSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
      />
    </svg>
  );
}
