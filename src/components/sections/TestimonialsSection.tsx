import { Reveal } from "@/components/motion/Motion";
import { Sparkle, Sprout, Underline } from "@/components/decorations/Doodles";

/**
 * TestimonialsSection ("Stimmen aus dem Zentrum").
 *
 * A masonry-style wall of quote cards in varying sizes and slight rotations –
 * editorial and human, not a tidy 3-up testimonial row. Avatars are coloured
 * monogram badges (no stock photos), keeping the handmade character.
 */
type Voice = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatar: string; // badge bg
  rotate: string;
  feature?: boolean; // larger, accented card
};

const voices: Voice[] = [
  {
    quote:
      "Unsere Tochter geht jeden Morgen gern hierher. Sie darf neugierig sein – und genau das trägt sie durch den Tag.",
    name: "Familie Berger",
    role: "Kinderhaus",
    initials: "FB",
    avatar: "bg-sage-dark",
    rotate: "lg:-rotate-1",
  },
  {
    quote:
      "Hier wird das Kind gesehen, nicht die Note. Das hat uns von Anfang an überzeugt.",
    name: "Familie Okonkwo",
    role: "Freie Schule",
    initials: "FO",
    avatar: "bg-clay",
    rotate: "lg:rotate-1",
    feature: true,
  },
  {
    quote:
      "Ich mag, dass ich selbst aussuchen kann, woran ich arbeite. Manchmal vergesse ich, dass gerade Schule ist.",
    name: "Mattis, 9 Jahre",
    role: "Freie Schule",
    initials: "M",
    avatar: "bg-sage-deep",
    rotate: "lg:rotate-2",
  },
  {
    quote:
      "Der Diplomkurs hat meinen Blick auf Lernen völlig verändert – fachlich fundiert und sehr persönlich begleitet.",
    name: "Teilnehmerin",
    role: "Diplomkurs",
    initials: "TD",
    avatar: "bg-forest",
    rotate: "lg:-rotate-2",
  },
  {
    quote:
      "Ein Ort, an dem Kinder Kinder sein dürfen – und ganz nebenbei unglaublich viel lernen.",
    name: "Familie Schmidt",
    role: "Kinderhaus",
    initials: "FS",
    avatar: "bg-sage-dark",
    rotate: "lg:rotate-1",
  },
  {
    quote:
      "Als Pädagogin schätze ich die Zeit, jedes Kind wirklich zu beobachten und genau dort zu begleiten, wo es gerade steht.",
    name: "Frau Lindner",
    role: "Team Freie Schule",
    initials: "FL",
    avatar: "bg-clay",
    rotate: "lg:-rotate-1",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative px-5 py-20 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1300px]">
        {/* asymmetric header */}
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-8" direction="up">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sage-deep">
              <Sprout className="h-4 w-4" />
              Stimmen aus dem Zentrum
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">
              Was Familien hier{" "}
              <span className="relative inline-block text-clay">
                erleben
                <Underline className="absolute -bottom-2 left-0 h-3 w-full text-sage" />
              </span>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-4" direction="up" delay={0.1}>
            <p className="text-lg leading-relaxed text-forest-soft lg:pb-2">
              Am schönsten erzählt sich unser Zentrum durch die Menschen, die hier
              jeden Tag zusammenkommen.
            </p>
          </Reveal>
        </div>

        {/* masonry wall */}
        <div className="mt-14 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {voices.map((voice, i) => (
            <Reveal key={voice.name} direction="up" delay={(i % 3) * 0.1}>
              <VoiceCard voice={voice} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceCard({ voice }: { voice: Voice }) {
  return (
    <figure
      className={`group relative rounded-[28px] border border-beige/70 p-7 shadow-warm-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-warm hover:rotate-0 ${
        voice.rotate
      } ${voice.feature ? "bg-sage/15" : "bg-cream"}`}
    >
      {/* oversized opening quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-1 font-display text-7xl leading-none text-clay/15"
      >
        &rdquo;
      </span>

      {voice.feature && (
        <Sparkle className="absolute -left-2 -top-2 h-7 w-7 text-clay" aria-hidden />
      )}

      <blockquote
        className={`relative font-display italic leading-snug text-forest ${
          voice.feature ? "text-2xl" : "text-xl"
        }`}
      >
        „{voice.quote}“
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3.5">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-semibold text-cream ${voice.avatar}`}
        >
          {voice.initials}
        </span>
        <span className="leading-tight">
          <span className="block font-semibold text-forest">{voice.name}</span>
          <span className="text-sm text-forest-soft">{voice.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
