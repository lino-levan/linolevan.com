import { Handlers } from "$fresh/server.ts";

import { addComment } from "@/lib/kv.ts";

export const handler: Handlers = {
  async POST(req) {
    const { post, name, message }: {
      post: string;
      name: string;
      message: string;
    } = await req.json();
    await addComment(post, name, message);
    return new Response(null);
  },
};
