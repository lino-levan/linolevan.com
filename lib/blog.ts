// Slightly modified code from https://github.com/denoland/deno_blog
import { walk, WalkEntry } from "$std/fs/walk.ts";
import { fromFileUrl, relative } from "$std/path/mod.ts";
import { pooledMap } from "$std/async/pool.ts";
import { extract as frontMatter } from "$std/front_matter/any.ts";
import removeMarkdown from "remove-markdown";

/** Represents a Post in the Blog. */
export interface Post {
  pathname: string;
  markdown: string;
  title: string;
  publishDate: Date;
  author?: string;
  snippet?: string;
  coverHtml?: string;
  /** An image URL which is used in the OpenGraph og:image tag. */
  ogImage?: string;
  tags?: string[];
  allowIframes?: boolean;
  disableHtmlSanitization?: boolean;
  readTime: number;
}

export const POSTS = new Map<string, Post>();

export async function loadContent() {
  // Read posts from the current directory and store them in memory.
  const postsDirectory = fromFileUrl(import.meta.resolve("../static/blog"));

  const traversal: WalkEntry[] = [];
  for await (const entry of walk(postsDirectory)) {
    if (entry.isFile && entry.path.endsWith(".md")) {
      traversal.push(entry);
    }
  }

  const pool = pooledMap(
    25,
    traversal,
    (entry) => loadPost(postsDirectory, entry.path),
  );

  for await (const _ of pool) {
    // noop
  }
}

async function loadPost(postsDirectory: string, path: string) {
  const contents = await Deno.readTextFile(path);
  let pathname = "/" + relative(postsDirectory, path);
  // Remove .md extension.
  pathname = pathname.slice(0, -3);

  const { body: content, attrs: _data } = frontMatter<Record<string, unknown>>(
    contents,
  );

  const data = recordGetter(_data);

  let snippet: string | undefined = data.get("snippet") ??
    data.get("abstract") ??
    data.get("summary") ??
    data.get("description");
  if (!snippet) {
    const maybeSnippet = content.split("\n\n")[0];
    if (maybeSnippet) {
      snippet = removeMarkdown(maybeSnippet.replace("\n", " "));
    } else {
      snippet = "";
    }
  }

  // Note: users can override path of a blog post using
  // pathname in front matter.
  pathname = data.get("pathname") ?? pathname;

  const post: Post = {
    title: data.get("title") ?? "Untitled",
    author: data.get("author"),
    pathname,
    // Note: no error when publish_date is wrong or missed
    publishDate: data.get("date") instanceof Date
      ? data.get("date")!
      : new Date(),
    snippet,
    markdown: content,
    coverHtml: data.get("cover_html"),
    ogImage: data.get("og:image"),
    tags: data.get("tags"),
    allowIframes: data.get("allow_iframes"),
    disableHtmlSanitization: data.get("disable_html_sanitization"),
    readTime: readingTime(content),
  };
  POSTS.set(pathname, post);
}

function recordGetter(data: Record<string, unknown>) {
  return {
    get<T>(key: string): T | undefined {
      return data[key] as T;
    },
  };
}

function readingTime(text: string) {
  const wpm = 225;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wpm);
}
