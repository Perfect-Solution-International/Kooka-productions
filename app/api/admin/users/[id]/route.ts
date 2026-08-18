import { createItemRoutes } from "@/lib/api/crud-route";
import { getUser, removeUser, updateUser } from "@/services/user.service";

const routes = createItemRoutes({ get: getUser, update: updateUser, remove: removeUser });

export const GET = routes.GET;
export const PATCH = routes.PATCH;
export const DELETE = routes.DELETE;
