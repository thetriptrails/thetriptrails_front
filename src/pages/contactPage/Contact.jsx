import ContactHero from "./ContactHero";
import ContactStrip from "./ContactStrip";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import WhyContactUs from "./WhyContactUs";

export default function Contact() {
  return (
    <main className="w-full overflow-x-hidden">
      <ContactHero />
      <ContactStrip />

      {/* Form + Info section */}
      <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-14 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>

      <WhyContactUs />
    </main>
  );
}
