import logo from "../app/assets/elearning.png";
import Image from "next/image";
import Link from "next/link";

function Header({ children }) {
  return (
    <nav className="mx-auto mb-6 flex w-full max-w-7xl items-center justify-between py-8">
      <Link className="flex items-center justify-center gap-2" href="/">
        <Image src={logo} alt="logo" priority className="h-10 w-10" />
        <p className="font-handwrite text-xl">Didactify</p>
      </Link>
      {children}
    </nav>
  );
}

export default Header;
