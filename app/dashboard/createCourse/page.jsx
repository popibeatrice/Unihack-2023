// pagina pentru generare cursuri

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import CreateForm from "@/components/client/CreateForm";
import CourseCreationContent from "@/components/client/CourseCreationContent";

export default async function CoursePage() {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/");
  }
  return (
    <main className="mt-20 flex min-h-[calc(100vh_-_175px)] w-full flex-col items-center gap-14 sm:mt-0 sm:justify-center">
      <CourseCreationContent />
    </main>
  );
}
