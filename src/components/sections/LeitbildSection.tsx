import { Reveal } from "@/components/motion/Motion";
import {
  CircleScribble,
  Leaf,
  Sprout,
  StarBurst,
  WaveDivider,
} from "@/components/decorations/Doodles";

/**
 * LeitbildSection – a warm, emotional colour-break.
 *
 * A sage band with hand-drawn wave edges. Big editorial statement on the left,
 * a small stack of overlapping "principle" notes on the right, and the
 * guiding Montessori sentence highlighted.
 */
const principles = [
  {
    title: "Vorbereitete Umgebung",
    text: "Räume und Materialien laden zum eigenständigen Tun ein.",
    rotate: "rotate-2",
  },
  {
    title: "Freie Wahl der Arbeit",
    text: "Kinder entscheiden, womit, wie lange und mit wem sie lernen.",
    rotate: "-rotate-2",
  },
  {
    title: "Begleiten statt bewerten",
    text: "Wir beobachten, ermutigen und geben Halt – ohne Notendruck.",
    rotate: "rotate-1",
  },
];

export function LeitbildSection() {
  return (
    <section className="relative isolate bg-sage py-24 sm:py-28 lg:py-32">
      {/* wavy edges that blend into the sand sections above & below */}
      <WaveDivider
        className="absolute inset-x-0 -top-px h-[60px] w-full text-sand"
        aria-hidden
      />
      <WaveDivider
        flip
        className="absolute inset-x-0 -bottom-px h-[60px] w-full text-sand"
        aria-hidden
      />

      {/* faint oversized leaf watermark */}
      <Leaf className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rotate-12 text-sage-deep/20" />

      <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-14 px-5 lg:grid-cols-12 lg:px-8">
        {/* statement */}
        <div className="lg:col-span-7">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-forest/70">
              <Sprout className="h-4 w-4" />
              Unser pädagogischer Gedanke
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.12] text-forest sm:text-5xl lg:text-[3.4rem]">
              Jedes Kind trägt seinen{" "}
              <span className="relative inline-block">
                <span className="relative z-10">eigenen</span>
                <CircleScribble
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute left-1/2 top-[46%] h-[150%] w-[126%] -translate-x-1/2 -translate-y-1/2 text-clay"
                />
              </span>{" "}
              Weg bereits in sich.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.16}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-forest/85">
              Unsere Aufgabe ist nicht, dieses Wachsen zu erzwingen, sondern ihm
              Raum zu geben. In einer vorbereiteten Umgebung dürfen Kinder selbst
              wählen, ausprobieren, sich vertiefen – und an ihren eigenen Fragen
              wachsen.
            </p>
          </Reveal>

          {/* the guiding sentence, highlighted */}
          <Reveal direction="up" delay={0.24}>
            <div className="mt-9 inline-flex items-center gap-4 rounded-[26px] border border-forest/10 bg-cream/80 px-6 py-5 shadow-warm-sm backdrop-blur">
              <StarBurst className="h-8 w-8 shrink-0 text-clay" />
              <p className="font-display text-2xl italic leading-snug text-forest">
                „Hilf mir, es selbst zu tun.“
              </p>
            </div>
          </Reveal>
        </div>

        {/* overlapping principle notes */}
        <div className="lg:col-span-5">
          <ul className="relative mx-auto max-w-md space-y-5">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.12}
              >
                <div
                  className={`rounded-[24px] border border-cream/60 bg-cream p-6 shadow-warm transition-transform duration-300 hover:rotate-0 ${p.rotate} ${
                    i === 1 ? "lg:ml-12" : ""
                  } ${i === 2 ? "lg:ml-4" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-sage/25 font-display text-sm font-semibold text-sage-deep">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-forest">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-forest-soft">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
