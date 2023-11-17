// pagina pentru generare cursuri

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import { useState } from "react";

import CreateForm from "@/components/client/CreateForm";
import CourseCreationContent from "@/components/client/CourseCreationContent";

export default async function CoursePage() {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/");
  }
  return (
    <main className="flex min-h-[calc(100vh_-_175px)] flex-col items-center justify-center gap-14">
      <CourseCreationContent />
    </main>
  );
}
