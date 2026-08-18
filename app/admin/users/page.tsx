import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { listUsers } from "@/services/user.service";
import { UsersManager } from "@/components/admin/UsersManager";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <UsersManager initialUsers={await listUsers()} />;
}
