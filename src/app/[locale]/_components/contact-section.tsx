import { getTranslations } from "next-intl/server";
import { ContactForm } from "./contact-form";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section className="wrap contact tex" id="contact" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">{t("title")}</h2>
        <p className="lead">{t("lead")}</p>
      </div>
      <ContactForm />
    </section>
  );
}
