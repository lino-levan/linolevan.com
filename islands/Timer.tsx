import { useSignal } from "@preact/signals";

export default function Timer() {
  const time = useSignal(0);
  const started = useSignal(false);

  return (
    <button
      class="text-9xl w-screen h-screen"
      onClick={() => {
        time.value = 30;
        if (!started.value) {
          started.value = true;
          const interval = setInterval(() => {
            time.value--;
            if (time.value === 0) {
              clearInterval(interval);
              started.value = false;
              // play sound
              const audio = new Audio("/friendless/timer.mp3");
              audio.play();
            }
          }, 1000);
        }
      }}
    >
      {time.value === 0 ? "start" : time}
    </button>
  );
}
