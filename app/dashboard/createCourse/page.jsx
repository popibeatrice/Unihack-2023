// pagina pentru generare cursuri

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import CreateForm from "@/components/client/CreateForm";

export default async function CoursePage() {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/");
  }
  return (
    <main className="flex min-h-[calc(100vh_-_175px)] items-center justify-center">
      <CreateForm />
    </main>
  );
}
