
import Image from 'next/image'
import Link from 'next/link'
const Header = () => {

  return <div className="w-full px-8 bg-white py-7">
    <div className="container flex items-center h-full ">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Picture of the author"
          width={122}
          height={33}
        />
      </Link>
    </div>
  </div>
}

export default Header
