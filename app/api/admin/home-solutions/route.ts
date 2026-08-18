import { createCollectionRoutes } from "@/lib/api/crud-route";
import { createHomeSolution, listHomeSolutionsAdmin } from "@/services/home-solution.service";

const routes = createCollectionRoutes({ list: listHomeSolutionsAdmin, create: createHomeSolution });
export const GET = routes.GET;
export const POST = routes.POST;
