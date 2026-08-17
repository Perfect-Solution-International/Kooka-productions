import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { listShowreel } from "@/lib/showreelStore";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <ProjectsManager initialItems={listShowreel()} />;
}
