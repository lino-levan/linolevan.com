import { render } from "gfm";

import { Head } from "@/components/Head.tsx";
import { Header } from "@/components/Header.tsx";
import Pond from "@/islands/Pond.tsx";
import Psst from "@/islands/secrets/Psst.tsx";

async function getThoughts() {
  try {
    const req = await fetch(
      "https://cohost.org/api/v1/project/linolevan/posts",
      {
        headers: {
          cookie: `connect.sid=${Deno.env.get("COHOST_KEY")}`,
        },
      },
    );
    const res = await req.json();

    return res.items as {
      publishedAt: string;
      plainTextBody: string;
      singlePostPageUrl: string;
      postingProject: { handle: string; avatarURL: string };
    }[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const req = await fetch(
    "https://raw.githubusercontent.com/lino-levan/lino-levan/main/README.md",
  );
  const res = await req.text();
  const text = res.split("Hi there\n")[1].split("###")[0];

  const thoughts = await getThoughts();

  return (
    <>
      <Head />
      <Header />
      <Psst />
      <div class="min-h-screen w-screen flex flex-col">
        <Pond />
        <div class="bg-teal-100 pt-8 flex-grow font-fredoka flex flex-col items-center">
          <div class="flex prose lg:prose-xl">
            <h1 class="animate-wiggle pr-4">👋</h1>
            <h1 class="w-full">Hi there</h1>
          </div>
          <div
            class="prose lg:prose-xl px-4"
            dangerouslySetInnerHTML={{ __html: render(text) }}
          />
          <div class="py-8 prose lg:prose-xl">
            <h2>Recent Thoughts</h2>
          </div>
          <div class="flex flex-col gap-2 max-w-screen-md w-full pb-4">
            {thoughts.map((thought) => (
              <div class="flex items-center gap-2 w-full bg-teal-200 p-4 rounded-lg">
                <img src={thought.postingProject.avatarURL} class="w-10 h-10" />
                <div class="flex flex-col">
                  <div class="flex gap-2 items-center">
                    <a href="https://cohost.org/linolevan" class="font-bold">
                      @{thought.postingProject.handle}
                    </a>{" "}
                    <span>
                      {new Intl.DateTimeFormat("en-US").format(
                        new Date(thought.publishedAt),
                      )}
                    </span>
                  </div>
                  <p>{thought.plainTextBody}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
