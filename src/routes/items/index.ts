import { Elysia, t } from "elysia";
import { Item, ItemsList } from "../../model/items";

const fetchQuery = t.Optional(
  t.Object({
    offset: t.Optional(t.Number({ default: 0 })),
    limit: t.Optional(t.Number({ default: 20 })),
    category: t.Optional(t.Array(t.Number())),
    search: t.Optional(t.String()),
  })
);

const notFoundResponse = t.Object({
  status: t.Literal("NOT_FOUND"),
  error: t.String(),
});

const items = new Elysia({ prefix: "/items", tags: ["Items"] })
  .get(
    "/",
    async ({ query }) => {
      if (query.search) {
        return {
          items: [],
          total: 0,
          limit: query.limit || 20,
          offset: query.offset || 0,
        };
      }

      return {
        items: [
          {
            id: 1,
            name: "Item 1",
            description: "Item 1 description",
            price: 10,
            category: "Category 1",
          },
        ],
        total: 1,
        limit: query.limit || 20,
        offset: query.offset || 0,
      };
    },
    {
      query: fetchQuery,
      response: {
        200: ItemsList,
      },
    }
  )
  .get(
    "/:id",
    async ({ params: { id }, error }) => {
      if (id !== 1) {
        return error(404, { status: "NOT_FOUND", error: "Item not found" });
      }
      return {
        status: "OK",
        item: {
          id: id,
          name: "Item 1",
          description: "Item 1 description",
          price: 10,
          image: undefined,
          category: {
            id: 1,
            name: "Category 1",
          },
          created_at: "2022-01-01T00:00:00.000Z",
          updated_at: "2022-01-01T00:00:00.000Z",
          deleted_at: undefined,
        },
      };
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
      response: {
        200: t.Object({
          status: t.Literal("OK"),
          item: Item,
        }),
        404: notFoundResponse,
      },
    }
  );

export default items;
