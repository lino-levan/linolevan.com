const kv = await Deno.openKv();

export interface Comment {
  name: string;
  message: string;
}

export async function addComment(post: string, name: string, message: string) {
  await kv.set(["blog", post, "comments", crypto.randomUUID()], {
    name,
    message,
  });
}

export async function listComments(post: string) {
  const iter = await kv.list<Comment>({ prefix: ["blog", post, "comments"] });
  const comments: Comment[] = [];

  for await (const post of iter) {
    comments.push(post.value);
  }

  return comments;
}
