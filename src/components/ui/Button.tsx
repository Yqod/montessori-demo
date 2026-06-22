import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Button – the shared call-to-action.
 *
 * Deliberately *not* a purple/blue gradient. Solid clay (terracotta) or a
 * warm outline, with a soft warm shadow and a nudging arrow. Renders as a Next
 * `Link` when `href` is given, otherwise a real `<button>`.
 */
type Variant = "solid" | "outline" | "soft";

const styles: Record<Variant, string> = {
  solid:
    "bg-clay text-cream shadow-warm hover:bg-clay-700 hover:shadow-warm-lg",
  outline:
    "border-2 border-forest/25 text-forest hover:border-forest/60 hover:bg-cream",
  soft: "bg-sage/20 text-forest-soft hover:bg-sage/35 hover:text-forest",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
};

export function Button({
  children,
  href,
  variant = "solid",
  className = "",
  icon,
  onClick,
  type = "button",
}: CommonProps & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls = `group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all duration-300 ${styles[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {icon ?? "→"}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
