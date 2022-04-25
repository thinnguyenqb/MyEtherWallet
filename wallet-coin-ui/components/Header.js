import Image from 'next/image'
const Header = () => {

  return <div className="container flex items-center h-full">
    <Image
      src="/logo.svg"
      alt="Picture of the author"
      width={122}
      height={33}
    />
  </div>
}

export default Header