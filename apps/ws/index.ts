import { prismaClient } from "@repo/db/client";

Bun.serve({
    port: 8081,
    fetch(req, server) { 
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        async message(ws, message) {
            try {
                await prismaClient.user.create({
                data: {
                    username: Math.random().toString(),
                    password: Math.random().toString()
                }
                })
                ws.send(message);
            } catch (error) {
                console.error("DB insert failed", error);
                ws.send("Error saving user");
            }
        },
    },
});