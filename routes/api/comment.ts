import { Handlers } from "$fresh/server.ts";
import { sendMessage } from "libhook";

import { addComment } from "@/lib/kv.ts";

export const handler: Handlers = {
  async POST(req) {
    const { post, name, message }: {
      post: string;
      name: string;
      message: string;
    } = await req.json();
    await addComment(post, name, message);

    await sendMessage({
      username: "linolevan.com",
      content:
        `New comment: ${name} on https://linolevan.com/blog/${post}\n\n${message}`,
    });

    return new Response(null);
  },
};
