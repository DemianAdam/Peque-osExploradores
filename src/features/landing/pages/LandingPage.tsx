import { CustomerNavbar } from "../components/CustomerNavbar";
import { CustomerHero } from "../components/CustomerHero";
import { CustomerMarquee } from "../components/CustomerMarquee";
import { CustomerValues } from "../components/CustomerValues";
import { CustomerGallery } from "../components/CustomerGallery";
import { CustomerDetails } from "../components/CustomerDetails";
import { CustomerContact } from "../components/CustomerContact";
import { CustomerFAQ } from "../components/CustomerFAQ";
import { CustomerFooter } from "../components/CustomerFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#fffaf0] text-[#183044] font-sans antialiased overflow-x-hidden selection:bg-[#f47718] selection:text-white">
      <CustomerNavbar />
      <main id="inicio">
        <CustomerHero />
        <CustomerMarquee />
        <CustomerValues />
        <CustomerGallery />
        <CustomerDetails />
        <CustomerContact />
        <CustomerFAQ />
      </main>
      <CustomerFooter />
    </div>
  );
}
