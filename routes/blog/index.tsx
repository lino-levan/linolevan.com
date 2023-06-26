import { Handlers, PageProps } from "$fresh/server.ts";

import { Head } from "@/components/Head.tsx";
import { Header } from "@/components/Header.tsx";
import { loadContent, Post, POSTS } from "@/lib/blog.ts";

type Posts = Map<string, Post>;

export const handler: Handlers<Posts> = {
  async GET(_req, ctx) {
    await loadContent();
    return ctx.render(POSTS);
  },
};

export default function Blog(props: PageProps<Posts>) {
  const filteredTag = props.url.searchParams.get("tag");

  return (
    <>
      <Head title="Blog | Lino Le Van" />
      <Header />
      <div class="font-fredoka flex flex-col gap-8 items-center pt-28 px-4 w-screen">
        {Array.from(props.data.entries()).filter(([_, post]) =>
          filteredTag ? post.tags?.includes(filteredTag) : true
        ).map(([slug, post]) => (
          <div class="w-full max-w-screen-sm flex flex-col gap-1">
            <a href={`/blog${slug}`}>
              <h1 class="font-fredoka font-bold text-gray-800 text-2xl xl:text-3xl">
                {post.title}
              </h1>
            </a>
            <div class="flex gap-2">
              {post.tags?.map((tag) => (
                <a href={`/blog?tag=${tag}`}>
                  <span class="text-sm text-gray-500 font-fredoka bg-gray-100 px-2 py-1 rounded-md">
                    #{tag}
                  </span>
                </a>
              ))}
            </div>
            <time
              class="text-gray-500"
              dateTime={post.publishDate.toISOString()}
            >
              {post.publishDate.toISOString().split("T")[0]}
            </time>
            <p class="text-gray-800">
              {post.snippet}
            </p>
            <a class="font-fredoka underline" href={`/blog${slug}`}>
              Read More
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
