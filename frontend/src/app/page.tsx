import { ArrowRightCircle } from "lucide-react";
import About from "./_sections/About";
import Footer from "./_sections/Footer";
import Header from "./_sections/Header";
import Link from "next/link";

export default function Index() {
  return (
    <div className="font-serif flex flex-col gap-80">
      <Header />
      <About />
      <Footer />

      <Link
        href="/catalogue"
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <button className="group hover:text-[#8D39AD] transition-all hover:cursor-pointer flex items-center gap-2 bg-primary hover:bg-secondary duration-300 px-4 py-2 rounded-2xl hover:z-10 hover:shadow-lg hover:scale-110">
          <p className="font-bold text-2xl">Catalogue</p>
          <ArrowRightCircle className="font-bold text-2xl group-hover:scale-125 transition-all duration-700" />
        </button>
      </Link>
    </div>
  );
}
