import { About } from "./_components/about";
import { AppChapter } from "./_components/app-chapter";
import { APPS } from "./_components/apps";
import { ContactSection } from "./_components/contact-section";
import { Friction } from "./_components/friction";
import { Hero } from "./_components/hero";
import { SiteFooter } from "./_components/site-footer";
import { SiteNav } from "./_components/site-nav";

export default function Home() {
  return (
    <>
      <SiteNav home />
      <main id="main">
        <Hero />
        <div id="apps">
          {APPS.map((app) => (
            <AppChapter key={app.slug} app={app} />
          ))}
        </div>
        <Friction />
        <About />
        <ContactSection />
      </main>
      <SiteFooter home />
    </>
  );
}
