import CourseCard from "@/components/client/CourseCard";
import axios from "axios";

async function GetCourses() {
  try {
    const res = await axios.get("/api/course/getCourses");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export default async function Gallery() {
  await GetCourses();

  return (
    <main className="flex min-h-[calc(100vh_-_175px)] w-full flex-col items-center justify-start gap-32">
      <h1 className="w-[90%] text-center text-4xl font-light sm:text-5xl md:text-6xl">
        Your <span className="font-handwrite text-primary">courses</span>
      </h1>
      <div className="grid w-[90%]">{/* <CourseCard /> */}</div>
    </main>
  );
}
