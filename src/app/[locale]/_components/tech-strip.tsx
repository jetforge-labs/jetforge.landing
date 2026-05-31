import { getTranslations } from "next-intl/server";

const technologies = [
  "React",
  "React Native",
  "Next.js",
  "TypeScript",
  "Node.js",
  "AWS",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Docker",
];

export async function TechStrip() {
  const t = await getTranslations("TechStrip");

  return (
    <div className="border-y border-white/5 bg-navy-950/50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
          {t("heading")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
