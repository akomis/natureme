import Link from "next/link";
import { Flower2 } from "lucide-react";

const CustomOrdersCard = () => {
  return (
    <div className="flex flex-col gap-6 px-2 items-center justify-center md:justify-start md:items-start">
      <div
        className="badge px-4 py-2 text-xl sm:text-2xl border-0 h-fit text-center"
        style={{ backgroundColor: "#ffecd2" }}
      >
        <Flower2 size={25} strokeWidth={1.5} className="mr-1" />
        Custom Orders
      </div>

      <div className="card bg-nescafeBoi text-primary-content w-full max-w-[500px]">
        <div className="card-body">
          <div className="flex flex-col font-sans">
            <p className="text-xl m-0 text-justify">
              For customized adaptations or decorative packaging for special
              occasions like weddings or christenings, we offer tailored
              options. Choose from beautifully presented soaps or solid perfumes
              in paper boxes, or our beeswax creams in charming small jars. Feel
              free to{" "}
              <span>
                <Link
                  href="/contact"
                  target="_blank"
                  className="font-bold no-underline text-purple-600 m-0 hover:text-pink-400 hover:cursor-pointer transition-all duration-700"
                >
                  contact us.
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrdersCard;
