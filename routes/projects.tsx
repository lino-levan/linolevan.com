import { Head } from "@/components/Head.tsx";
import { Header } from "@/components/Header.tsx";

interface Project {
  name: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
}

const gradients = [
  "from-red-300 to-red-100",
  "from-orange-300 to-orange-100",
  "from-amber-300 to-amber-100",
  "from-yellow-300 to-yellow-100",
  "from-lime-300 to-lime-100",
  "from-green-300 to-green-100",
  "from-emerald-300 to-emerald-100",
  "from-teal-300 to-teal-100",
  "from-cyan-300 to-cyan-100",
  "from-sky-300 to-sky-100",
  "from-blue-300 to-blue-100",
  "from-indigo-300 to-indigo-100",
  "from-violet-300 to-violet-100",
  "from-purple-300 to-purple-100",
  "from-fuchsia-300 to-fuchsia-100",
  "from-pink-300 to-pink-100",
  "from-rose-300 to-rose-100",
];

export default function Home() {
  const projects: Project[] = JSON.parse(
    Deno.readTextFileSync("./static/projects.json"),
  );

  return (
    <>
      <Head title="Projects | Lino Le Van" />
      <Header />
      <div class="pt-28 font-fredoka flex flex-col items-center gap-8">
        {projects.map((project, i) => (
          <div
            class={`max-w-screen-sm shadow-xl p-8 rounded-lg flex flex-col gap-2 bg-gradient-to-tr ${
              gradients[i % gradients.length]
            }`}
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
