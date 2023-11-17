import logo from "../app/assets/elearning.png";
import Image from "next/image";
import Link from "next/link";

function Header({ children }) {
  return (
    <nav className="mx-auto mb-6 flex w-full max-w-7xl items-center justify-between py-8">
      <Link href="/">
        <Image src={logo} alt="logo" priority className="h-10 w-10" />
      </Link>
      {children}
    </nav>
  );
}

export default Header;
