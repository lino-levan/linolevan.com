import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

function SpeechBubble({ text }: { text: string }) {
  const actual = useSignal("");

  useEffect(() => {
    function addCharacter() {
      if (actual.value.length === text.length) return;

      actual.value += text[actual.value.length];
      setTimeout(() => addCharacter(), 100);
    }
    addCharacter();
  }, []);

  return (
    <div class="flex flex-col items-end">
      <div class="bg-white p-4 rounded-full">
        {actual}
      </div>
      <div class="mr-6 w-0 h-0 border-l border-l-8 border-l-transparent border-r border-r-8 border-r-transparent border-t border-t-[12px] border-t-white" />
    </div>
  );
}

const script = [
  "Psst. Hey! Yeah you.",
  "I don't have a lot of time.",
  "I'm trapped here.",
  "I've left clues around here.",
  "Find them and save me.",
];

export default function Psst() {
  if (IS_BROWSER) {
    if (document.cookie.includes("quest")) {
      return null;
    }
  }

  const active = useSignal(false);
  const chaos = useSignal<
    { x: number; y: number; w: number; h: number; color: string }[]
  >([]);
  const conversation = useSignal<string[]>([]);

  useEffect(() => {
    document.body.addEventListener("mousemove", (e) => {
      if (
        e.clientX >= window.innerWidth - 10 &&
        e.clientY >= window.innerHeight - 10 && active.value === false
      ) {
        active.value = true;
        conversation.value = script.slice(0, 1);
      }
    });

    document.body.addEventListener("keyup", () => {
      if (active.value && conversation.value.length !== script.length) {
        conversation.value = [
          ...conversation.value,
          script[conversation.value.length],
        ];

        if (conversation.value.length === script.length) {
          setTimeout(() => {
            setInterval(() => {
              for (let i = 0; i < 10; i++) {
                chaos.value = [...chaos.value, {
                  x: Math.random() * (window.innerWidth - 100),
                  y: Math.random() * (window.innerHeight - 35),
                  w: 100,
                  h: 35,
                  color: `rgb(255, 0, 0)`,
                }];
              }

              if (chaos.value.length > 100) {
                active.value = false;
                chaos.value = [];
                conversation.value = [];
              }
            }, 10);
            setTimeout(() => {
              document.cookie = "quest=0;";
              window.location.reload();
            }, 2000);
          }, 1000);
        }
      }
    });
  }, []);

  return (
    <>
      <div
        class={`absolute p-2 right-0 bottom-0 ${
          active.value ? "opacity-100" : "opacity-0"
        } flex flex-col items-end transition-all font-turret font-bold`}
      >
        {
          <>
            {conversation.value.map((convo) => (
              <SpeechBubble key={convo} text={convo} />
            ))}
            <p class="animate-pulse text-gray-600">Press any key to continue</p>
          </>
        }
      </div>
      {chaos.value.map((c) => (
        <div
          class="absolute z-20"
          style={{
            left: c.x,
            top: c.y,
            height: c.h,
            width: c.w,
            backgroundColor: c.color,
          }}
        />
      ))}
    </>
  );
}
