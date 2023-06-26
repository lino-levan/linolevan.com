import { Handlers, PageProps } from "$fresh/server.ts";

import { Head } from "@/components/Head.tsx";
import { Header } from "@/components/Header.tsx";

interface Project {
  name: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  gradient: string;
}

export const handler: Handlers<Project[]> = {
  async GET(_, ctx) {
    const projects = JSON.parse(
      await Deno.readTextFileSync("./static/projects.json"),
    );
    return ctx.render(projects);
  },
};

export default function Home(props: PageProps<Project[]>) {
  return (
    <>
      <Head title="Projects | Lino Le Van" />
      <Header />
      <div class="pt-28 font-fredoka flex flex-col items-center gap-8">
        {props.data.map((project) => (
          <div
            class={`max-w-screen-sm shadow-xl p-8 rounded-lg flex flex-col gap-2 bg-gradient-to-tr ${project.gradient}`}
          >
            <a href={project.demo ?? project.github}>
              <img class="rounded-lg shadow-xl" src={project.image} />
            </a>
            <h1 class="font-bold text-2xl flex items-center gap-2">
              {project.name}
            </h1>
            <p>{project.description}</p>
            <div class="flex gap-2">
              {project.github && (
                <a
                  class="inline-block cursor-pointer underline"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              )}
              {project.demo && (
                <a
                  class="inline-block cursor-pointer underline"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
