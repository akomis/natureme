import Image from "next/image";
import { fetchFromSanity } from "@/utils";
import { Instagram, Lock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

const LOGO_SIZE = 250;
const ICON_SIZE = 100;

const Extras = () => {
  const pageLinkStyle =
    "flex flex-col justify-center items-center hover:scale-110 hover:z-10 transition-all duration-300";

  return (
    <div className="flex flex-col lg:flex-row gap-20 md:gap-40 text-2xl">
      <Link href="/faq" className={pageLinkStyle}>
        <Image
          src={"/FAQ.png"}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="Συχνές Ερωτήσεις"
        />
        <h2 className="font-bold">FAQ</h2>
      </Link>
      <a href="/activities" className={pageLinkStyle}>
        <Image
          src={"/Activities.png"}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="Δραστηριότητες"
        />
        <h2 className="font-bold">Activities</h2>
      </a>
      <Link href="/contact" className={pageLinkStyle}>
        <Image
          src={"/Contact.png"}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt="Επικοινωνία"
        />
        <h2 className="font-bold">Contact</h2>
      </Link>
    </div>
  );
};

const Footer = async () => {
  const globalAssets = (await fetchFromSanity("global"))[0];
  const { address, telephone, instagram, email } = globalAssets.info;

  const infoLinkStyle =
    "flex gap-4 justify-center items-center hover:scale-110 hover:z-10 transition-all";

  return (
    <section className="flex flex-col h-fit justify-center items-center gap-32 md:gap-52 pb-40 px-10 max-w-7xl mx-auto">
      <Extras />
      <footer className="flex flex-col items-center gap-20 justify-center lg:flex-row md:justify-between w-full">
        <Logo width={LOGO_SIZE} height={LOGO_SIZE} />
        <div className="flex flex-col gap-4 justify-center items-center lg:justify-between lg:items-start">
          <a
            className={infoLinkStyle}
            href={telephone.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone size={30} />
            <h2 className="text-lg">{telephone.text}</h2>
          </a>
          <a
            className={infoLinkStyle}
            href={email.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={30} />
            <h2 className="text-lg">{email.text}</h2>
          </a>
          <a
            className={infoLinkStyle}
            href={instagram.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={30} />
            <h2 className="text-lg">{instagram.text}</h2>
          </a>
          <a
            className={infoLinkStyle}
            href={address.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={30} />
            <h2 className="text-lg">{address.text}</h2>
          </a>
        </div>
        <div className="flex flex-col justify-between gap-20">
          <div className="flex flex-col items-center lg:items-end">
            <h2 className="text-xl">We trust nature</h2>
            <h2 className="font-bold text-3xl">for everything.</h2>
          </div>

          <div className="flex flex-row-reverse lg:flex-row gap-2 items-start">
            <h2 className="align-right text-right font-sans">
              Transactions secured with SSL
            </h2>
            <Lock size={20} />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
