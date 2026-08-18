import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { HomeSolutionsManager } from "@/components/admin/HomeSolutionsManager";
import { listHomeSolutionsAdmin } from "@/services/home-solution.service";

export const dynamic = "force-dynamic";
export default async function HomeSolutionsAdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return <HomeSolutionsManager initialItems={await listHomeSolutionsAdmin()} />;
}
