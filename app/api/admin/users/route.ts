import { createCollectionRoutes } from "@/lib/api/crud-route";
import { createUser, listUsers } from "@/services/user.service";

const routes = createCollectionRoutes({ list: listUsers, create: createUser });

export const GET = routes.GET;
export const POST = routes.POST;
