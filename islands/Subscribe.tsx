import { useRef, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

export default function Subscribe() {
  const input = useRef(null);
  const subscribed = useSignal(false);
  const error = useSignal("");

  return (
    <div class="flex flex-col justify-center items-center max-w-screen-md w-full">
      <div class="w-full flex flex-col md:flex-row gap-4">
        {subscribed.value
          ? (
            <p class="bg-emerald-500 text-white font-bold py-2 px-4 rounded w-full">
              Success! Now check your email to confirm your subscription.
            </p>
          )
          : (
            <>
              <input
                ref={input}
                class="border p-2 rounded w-full font-fredoka"
                placeholder="example@example.com"
              >
              </input>
              <button
                class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full font-fredoka"
                onClick={async () => {
                  if (input.current) {
                    const cur = input.current as HTMLInputElement;
                    if (cur.value.length > 0) {
                      try {
                        const subscribeReq = await fetch(
                          `/api/subscribe?email=${cur.value}`,
                        );
                        const subscribe = await subscribeReq.json();

                        if (subscribe.error) {
                          error.value = "Failed to subscribe";
                        } else {
                          subscribed.value = true;
                          error.value = "";
                        }
                      } catch {
                        error.value = "Network Error";
                      }
                    } else {
                      error.value = "No Email Provided";
                    }
                  }
                }}
              >
                Subscribe to the Blog
              </button>
            </>
          )}
      </div>
      <p class="pt-4 text-red-600">{error}</p>
    </div>
  );
}
