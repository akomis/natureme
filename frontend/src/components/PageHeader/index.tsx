import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <div className="flex align-baseline self-start gap-4">
      <Link href="/">
        <button className="hover:cursor-pointer flex items-center gap-2 bg-primary hover:bg-secondary transition-all duration-300 px-4 py-2 rounded-2xl btn">
          <ArrowLeft />
        </button>
      </Link>
      <h1 className="my-2 text-2xl sm:text-3xl">{title}</h1>
    </div>
  );
};

export default PageHeader;
