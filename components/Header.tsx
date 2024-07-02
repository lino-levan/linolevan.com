const links = [
  { name: "~/projects", url: "/projects" },
  { name: "~/blog", url: "/blog" },
];

export function Header() {
  return (
    <div class="fixed z-10 flex min-w-full items-center justify-between py-4 px-4 sm:px-10 bg-white">
      <div class="mx-auto flex w-full max-w-6xl justify-between">
        <div class="navbar flex items-center space-x-3 text-xs sm:space-x-8 sm:text-lg">
          <a href="/">
            <div class="flex items-center cursor-pointer text-emerald-500 hover:text-teal-800">
              <img
                src="/images/lilypad.png"
                alt="Lilypad"
                width={68}
                height={40}
              />
              <p class="text-4xl font-schoolbell">lino.</p>
            </div>
          </a>
          <div class="flex">
            {links.map(({ name, url }) => (
              <p
                key={name}
                class="font-fredoka text-xl pl-4 text-emerald-500 hover:text-teal-800"
              >
                <a href={url}>{name}</a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
