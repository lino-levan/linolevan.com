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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="stylesheet" href="/index.css" />
    </_Head>
  );
}
