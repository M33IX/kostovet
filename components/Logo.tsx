import Image from "next/image";
import Link from "next/link";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={footer ? "brand-logo brand-logo--footer" : "brand-logo"} href="/" aria-label="Kosto-Vet — на главную">
      <Image
        className="brand-logo__image"
        src="/logo.svg"
        alt=""
        aria-hidden="true"
        width={593}
        height={319}
        priority={false}
      />
    </Link>
  );
}
