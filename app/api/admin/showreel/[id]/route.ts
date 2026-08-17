import { createItemRoutes } from "@/lib/api/crud-route";
import { getShowreelById, updateShowreel, deleteShowreel } from "@/services/showreel.service";

const routes = createItemRoutes({ get: getShowreelById, update: updateShowreel, remove: deleteShowreel });

export const GET = routes.GET;
export const PATCH = routes.PATCH;
export const DELETE = routes.DELETE;
