import { Comment } from "@/lib/kv.ts";

export default function Comments(props: { post: string; comments: Comment[] }) {
  return (
    <div class="border-t py-4 w-full max-w-screen-md flex flex-col gap-2">
      <p class="text-2xl">Comments</p>
      <input
        id="name"
        class="border p-2 rounded w-full"
        placeholder="Your Name"
      />
      <textarea
        id="comment"
        class="border p-2 rounded w-full"
        placeholder="Your Comment"
      />
      <button
        onClick={() => {
          fetch("/api/comment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              post: props.post,
              name: (document.getElementById("name") as HTMLInputElement).value,
              message:
                (document.getElementById("comment") as HTMLTextAreaElement)
                  .value,
            }),
          }).then(() => {
            window.location.reload();
          });
        }}
        class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Comment
      </button>
      <div class="border-b my-4" />
      {props.comments.map((comment) => (
        <div class="flex flex-col gap-2 p-4 border rounded">
          <p class="text-lg font-bold">{comment.name}</p>
          <p>{comment.message}</p>
        </div>
      ))}
    </div>
  );
}
