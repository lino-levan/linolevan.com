import { Head as _Head } from "$fresh/runtime.ts";

export function Head(props: { title?: string; description?: string }) {
  return (
    <_Head>
      <title>{props.title ?? "Lino Le Van"}</title>
      <meta
        name="description"
        content={props.description ??
          "My portfolio site for my personal projects"}
      />
    </_Head>
  );
}
