import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "gfm";
import "prism/prism-typescript?no-check";
import "prism/prism-rust?no-check";

import { Head } from "@/components/Head.tsx";
import { Header } from "@/components/Header.tsx";
import Subscribe from "@/islands/Subscribe.tsx";
import Comments from "@/islands/Comments.tsx";
import { loadContent, Post, POSTS } from "@/lib/blog.ts";
import { Comment, listComments } from "@/lib/kv.ts";

interface BlogProps {
  post: Post;
  comments: Comment[];
}

export const handler: Handlers<BlogProps> = {
  async GET(_req, ctx) {
    await loadContent();

    const post = POSTS.get("/" + ctx.params.slug);
    if (!post) return ctx.renderNotFound();
    return ctx.render({
      post,
      comments: await listComments(ctx.params.slug),
    });
  },
};

export default function Blog(props: PageProps<BlogProps>) {
  return (
    <>
      <Head
        title={props.data.post.title}
        description={props.data.post.snippet}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: CSS +
            ".markdown-body ul { list-style: disc } .markdown-body ol { list-style: numeric } .markdown-body table { width: fit-content; } .markdown-body { font-family: 'Fredoka', sans-serif; }",
        }}
      >
      </style>
      <Header />
      <div class="font-fredoka flex flex-col gap-4 items-center pt-28 px-4 w-screen">
        <h1 class="font-fredoka font-bold text-gray-800 text-2xl xl:text-3xl max-w-screen-md w-full">
          {props.data.post.title}
        </h1>
        <time
          class="text-gray-500 max-w-screen-md w-full border-b pb-4"
          dateTime={props.data.post.publishDate.toISOString()}
        >
          {props.data.post.publishDate.toISOString().split("T")[0]}
        </time>
        <div
          class="markdown-body max-w-screen-md w-full"
          dangerouslySetInnerHTML={{ __html: render(props.data.post.markdown) }}
        />
        <Subscribe />
        <Comments post={props.params.slug} comments={props.data.comments} />
      </div>
    </>
  );
}
