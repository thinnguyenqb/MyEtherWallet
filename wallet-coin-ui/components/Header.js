import Image from "next/image";
import Link from "next/link";
const Header = ({
  container = true,
  right: HeaderRight = null,
  left: HeaderLeft = false,
}) => {
  return (
    <div className="w-full px-8 bg-white py-7">
      <div
        className={`flex items-center h-full ${container ? "container" : ""}`}
      >
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Picture of the author"
            width={122}
            height={33}
          />
        </Link>

        {HeaderLeft && (
          <span className="ml-2 text-3xl font-light text-gray-600">
            Explorer
          </span>
        )}

        {HeaderRight && <HeaderRight className="self-end" />}
      </div>
    </div>
  );
};

export default Header;
