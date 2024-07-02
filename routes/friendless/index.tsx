import { Head } from "@/components/Head.tsx";
import { Header } from "@/components/Header.tsx";

export default function Friendless() {
  return (
    <div class="w-screen flex flex-col items-center font-schoolbell text-xl ">
      <div class="max-w-screen-md w-full p-4 flex flex-col gap-2">
        <h1 class="text-4xl font-bold text-emerald-500">Friendless</h1>
        <p>
          Hi. If you're here, that means you were hoping for a ruleset for
          friendless, the card game. Minor issue, I'm afraid I never quite...
          finished playtesting the game? So here's the deal. Play with the rules
          below, but if you want to add, remove, or modify them, go for it. If
          one of your changes turns out to make the game more fun, hit me up and
          I'm happy to make it official (or an official variation). Also, if
          you're one of the people asking for a download of the cards,{" "}
          <a class="text-blue-500 hover:underline" href="/friendless/cards.zip">
            here you go
          </a>.
        </p>
        <h2 class="text-2xl font-bold text-emerald-500">Basics</h2>
        <p>
          To win the game, a player must have 5 friend cards down at the end of
          their turn. The type of card can be determined by checking the color
          of the header text.<br />
          <br />
          Green = Friend<br />
          Blue = Ability<br />
          Red = Event<br />
          Purple = Instant<br />
          <br />
          All friends have an ability of some sort. If the friend's ability is
          marked with a "[P]", then it is a passive ability and is always active
          while the friend is down. If the friend is not marked with a "[P]",
          then the ability is an activated ability and can be used once per
          turn.<br />
          <br />
          Once the whole deck is used, shuffle the discard pile and use it as
          the new deck.<br />
          <br />
          Instants can be played at any time, especially during another player's
          turn. They are then discarded after use.<br />
          <br />
          Event cards are (and must) be played immediately and then discarded.
          They cannot be held in a player's hand.<br />
          <br />
          Hand count, cards in play, and the discard pile is (and must be)
          public knowledge. You aren't allowed to put cards in your sleeves
          (*cough* Anna *cough*).<br />
          <br />
          If turns are taking too long, you should implement a 30 second speed
          timer. Your turn ends when you click the timer button or when the
          timer expires. To help with this, I've created a{" "}
          <a class="text-blue-500 hover:underline" href="/friendless/timer">
            friendless speed timer
          </a>{" "}
          for you. You're welcome.
        </p>
        <h2 class="text-2xl font-bold text-emerald-500">Setup</h2>
        <p>
          Remove event cards. Shuffle the deck. Everyone is dealt five cards to
          start the game. The event card should then be shuffled back into the
          deck. The eldest player or the winner of the last game starts.
        </p>
        <h2 class="text-2xl font-bold text-emerald-500">Turn</h2>
        <p>
          1. Draw a card from the deck.<br />
          2. Play a friend, use a friend ability, and/or use an ability card (in
          any order).<br />
          3. End turn.
        </p>
        <h2 class="text-2xl font-bold text-emerald-500">Technicalities</h2>
        <p>
          Ah, so you're a William main. Noted. Let's go over some of the
          technicalities of the game.<br />
          <br />
          1. Counterpoints can be applied to all event cards regardless of what
          the card says.<br />
          2. You can of course, counterpoint a counterpoint.<br />
          3. There is no "event stack". You can't counterpoint something from
          the past.<br />
          4. Global events include and only include: "Scare", "Isolation", and
          "Floor is Lava"<br />
          5. You don't have to retain Jaeden to use an ability twice.<br />
          6. "No player" includes the player who has Sean in play.<br />
          7. Sean is not a shield.<br />
          <br />
          Okay so if you're this far down you still haven't found a rule that
          applies in your situation. Great! You're probably playing the game
          right. There are three ways to resolve this:<br />
          <br />
          1. Ruthlessly argue your side against the detractors (your friends)
          until they agree (and start considering being your ex-friends).<br />
          2. Play a game of rock-paper-scissors or first to shoot a basket or
          something. I've found that this is the best way to have fun while
          playing the game.<br />
          3. Hit me up and I'll make a ruling. I'm happy to make a ruling on the
          spot.<br />
        </p>
      </div>
    </div>
  );
}
