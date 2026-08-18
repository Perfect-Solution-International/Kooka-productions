import { createItemRoutes } from "@/lib/api/crud-route";
import { deleteHomeSolution, getHomeSolution, updateHomeSolution } from "@/services/home-solution.service";

const routes = createItemRoutes({ get: getHomeSolution, update: updateHomeSolution, remove: deleteHomeSolution });
export const GET = routes.GET;
export const PATCH = routes.PATCH;
export const DELETE = routes.DELETE;
