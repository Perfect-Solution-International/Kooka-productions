import { createCollectionRoutes } from "@/lib/api/crud-route";
import { listShowreelAdmin, createShowreel } from "@/services/showreel.service";

const routes = createCollectionRoutes({ list: listShowreelAdmin, create: createShowreel });

export const GET = routes.GET;
export const POST = routes.POST;
