import Link from "next/link";
import { Home } from "lucide-react";

const HomeButton = () => (
  <Link href="/">
    <button className="btn btn-lg w-full">
      <Home />
    </button>
  </Link>
);

export default HomeButton;
