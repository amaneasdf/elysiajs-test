import { t } from "elysia";

const Item = t.Object({
  id: t.Integer(),
  name: t.String(),
  description: t.String(),
  price: t.Number(),
  image: t.Optional(t.String()),
  category: t.Object({
    id: t.Integer(),
    name: t.String(),
  }),
  created_at: t.String(),
  updated_at: t.Optional(t.String()),
  deleted_at: t.Optional(t.String()),
});

const ItemSnippet = t.Object({
  id: t.Integer(),
  name: t.String(),
  description: t.String(),
  price: t.Number(),
  category: t.String(),
});

const ItemsList = t.Object({
  items: t.MaybeEmpty(t.Array(ItemSnippet)),
  total: t.Number(),
  limit: t.Number(),
  offset: t.Number(),
});

const CreateItemDTO = t.Object({
  name: t.String({ minLength: 6, maxLength: 100 }),
  description: t.Optional(t.String()),
  price: t.Number(),
  image: t.Optional(t.String()),
  category_id: t.Integer(),
});

const UpdateItemDTO = t.Object({
  name: t.Optional(t.String({ minLength: 6, maxLength: 100 })),
  description: t.Optional(t.String()),
  price: t.Optional(t.Number()),
  image: t.Optional(t.String()),
  category_id: t.Optional(t.Integer()),
});

export { Item, ItemSnippet, ItemsList, CreateItemDTO, UpdateItemDTO };

export type Item = typeof Item.static;
export type ItemSnippet = typeof ItemSnippet.static;
export type ItemsList = typeof ItemsList.static;

export type CreateItemDTO = typeof CreateItemDTO.static;
export type UpdateItemDTO = typeof UpdateItemDTO.static;
