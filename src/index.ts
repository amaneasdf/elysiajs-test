import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import routes from "./routes";

declare module "bun" {
  interface Env {
    PORT: number;
    DB_URL: string;
  }
}

class Note {
  constructor(public data: string[] = ["Tardis"]) {}
}

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "My API",
          version: "1.0.0",
        },
      },
    })
  )
  .onError(({ code, error }) => {
    if (code === "VALIDATION") {
      let message = error.message;

      // if error message can be parsed as JSON
      if (message.startsWith("{")) {
        message = JSON.parse(message);
      }

      return {
        status: "error",
        error: message,
      };
    }

    console.error(error);
  })
  .decorate("note", new Note())
  .get("/", () => "Hello Elysia")
  .get("/health", () => "OK")
  .use(routes.items)
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
