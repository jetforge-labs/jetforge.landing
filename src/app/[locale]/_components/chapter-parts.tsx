import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

/** Rich-text tag for the key caps written as <kbd>…</kbd> inside messages. */
export const richKbd = { kbd: (chunks: ReactNode) => <kbd>{chunks}</kbd> };

/** The chapter's big quote: the opening mark hangs into the margin. */
export function Phrase({ id, text }: { id: string; text: string }) {
  return (
    <h2 className="phrase" id={id}>
      <span className="q q-open" aria-hidden="true">&ldquo;</span>
      {text}
      <span className="q" aria-hidden="true">&rdquo;</span>
    </h2>
  );
}

export function Ident({ icon, name, meta }: { icon: string; name: string; meta: string }) {
  return (
    <div className="ident">
      <Image src={icon} alt="" width={56} height={56} />
      <p>
        {name}
        <small>{meta}</small>
      </p>
    </div>
  );
}

/** One plan of a chapter: a header with the plan name and price, then its feature rows (in the order of the messages). */
export async function Plan({ ns, variant }: { ns: string; variant: "basic" | "pro" }) {
  const t = await getTranslations(ns);
  const ids = Object.keys(t.raw("rows") as Record<string, unknown>);

  return (
    <div className={`plan-${variant}`}>
      <div className="plan-head">
        <h3>
          {t("title")} <b>{t("price")}</b>
        </h3>
        <p>{t("note")}</p>
      </div>
      <ul className="rows">
        {ids.map((id) => (
          <li key={id}>
            <span className="k">{t.rich(`rows.${id}.k`, richKbd)}</span>
            <div>
              <h4>{t(`rows.${id}.title`)}</h4>
              {t.has(`rows.${id}.text`) && <p>{t.rich(`rows.${id}.text`, richKbd)}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
