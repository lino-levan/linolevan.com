import { render } from "gfm";

import { Head } from "@/components/Head.tsx";
import { Header } from "@/components/Header.tsx";
import Pond from "@/islands/Pond.tsx";
import Psst from "@/islands/secrets/Psst.tsx";

export default async function Home() {
  const req = await fetch(
    "https://raw.githubusercontent.com/lino-levan/lino-levan/main/README.md",
  );
  const res = await req.text();
  const text = res.split("Hi there\n")[1].split("###")[0];

  return (
    <>
      <Head />
      <Header />
      <Psst />
      <div class="min-h-screen w-screen flex flex-col">
        <Pond />
        <div class="bg-teal-100 pt-8 flex-grow font-fredoka flex flex-col items-center">
          <div className="flex prose lg:prose-xl">
            <h1 className="animate-wiggle pr-4">👋</h1>
            <h1 class="w-full">Hi there</h1>
          </div>
          <div
            class="prose lg:prose-xl px-4"
            dangerouslySetInnerHTML={{ __html: render(text) }}
          />
        </div>
      </div>
    </>
  );
}
