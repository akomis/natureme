import Logo from "@/components/Logo";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LOGO_SIZE = 250;

const Header = () => {
  return (
    <section className="flex justify-center items-center min-h-[500px] h-screen max-h-screen">
      <div className="relative h-fit w-fit flex flex-col items-center md:items-center md:flex-row gap-10">
        <Logo width={LOGO_SIZE} height={LOGO_SIZE} priority />
        <div className=" flex flex-col items-center md:justify-between w-fit mt-5">
          <div className="flex flex-col gap-4">
            <p className="text-2xl">{"Εμπιστευόμαστε τη φύση για"}</p>
            <p className="text-5xl font-bold text-[#C54903]">
              {"το δέρμα μας"}
            </p>
          </div>
        </div>
        <Image
          src={"/header_1.png"}
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          alt="Product"
        />
      </div>
      <div
        className={"fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10"}
      >
        <Link href="/catalogue">
          <button className="hover:cursor-pointer flex items-center gap-2 bg-primary hover:bg-secondary transition-all duration-300 px-4 py-2 rounded-2xl hover:z-10 hover:shadow-lg hover:scale-110">
            <div className="font-bold text-xl">Κατάλογος</div>
            <ArrowRightCircle />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Header;
