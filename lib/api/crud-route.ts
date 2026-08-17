import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { errorResponse, readJson, unauthorized } from "@/lib/api/responses";

/*
 * Every admin entity exposes the same two routes, so the handlers are built
 * from its service functions rather than copied per entity. Params arrive as a
 * promise, which is the Next 16 route-handler contract.
 */

export type RouteContext = { params: Promise<{ id: string }> };

type CollectionHandlers = {
  GET: () => Promise<NextResponse>;
  POST: (request: Request) => Promise<NextResponse>;
};

type ItemHandlers = {
  GET: (request: Request, context: RouteContext) => Promise<NextResponse>;
  PATCH: (request: Request, context: RouteContext) => Promise<NextResponse>;
  DELETE: (request: Request, context: RouteContext) => Promise<NextResponse>;
};

export function createCollectionRoutes<T>(service: {
  list: () => Promise<T[]>;
  create: (body: unknown) => Promise<T>;
}): CollectionHandlers {
  return {
    async GET() {
      if (!(await isAdminAuthenticated())) return unauthorized();

      try {
        return NextResponse.json({ items: await service.list() });
      } catch (error) {
        return errorResponse(error);
      }
    },

    async POST(request) {
      if (!(await isAdminAuthenticated())) return unauthorized();

      try {
        const item = await service.create(await readJson(request));
        return NextResponse.json({ item }, { status: 201 });
      } catch (error) {
        return errorResponse(error);
      }
    },
  };
}

export function createItemRoutes<T>(service: {
  get: (id: string) => Promise<T>;
  update: (id: string, body: unknown) => Promise<T>;
  remove: (id: string) => Promise<void>;
}): ItemHandlers {
  return {
    async GET(_request, context) {
      if (!(await isAdminAuthenticated())) return unauthorized();

      try {
        const { id } = await context.params;
        return NextResponse.json({ item: await service.get(id) });
      } catch (error) {
        return errorResponse(error);
      }
    },

    async PATCH(request, context) {
      if (!(await isAdminAuthenticated())) return unauthorized();

      try {
        const { id } = await context.params;
        const item = await service.update(id, await readJson(request));
        return NextResponse.json({ item });
      } catch (error) {
        return errorResponse(error);
      }
    },

    async DELETE(_request, context) {
      if (!(await isAdminAuthenticated())) return unauthorized();

      try {
        const { id } = await context.params;
        await service.remove(id);
        return NextResponse.json({ ok: true });
      } catch (error) {
        return errorResponse(error);
      }
    },
  };
}
