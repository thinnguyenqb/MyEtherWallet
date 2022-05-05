import Header from '../components/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="px-8 bg-white py-7">
     <Header />

      <div className="container flex mt-12">
        <div className="h-full my-auto">
          <div>
            <h1 className="text-5xl font-bold leading-tight text-gray-800">SHIRO</h1>
            <h1 className="mb-4 text-5xl font-bold leading-tight text-gray-800">Original Wallet</h1>
            <span className="text-sm text-gray-600">
            SHIRO is a free, client-side interface helping you interact with the Ethereum blockchain. Our easy-to-use, open-source platform allows you to generate wallets, interact with smart contracts, and so much more.
          </span>
          </div>
        </div>
        <Image
            src="/Explore-illo.svg"
            alt="Picture of the author"
            width={700}
            height={700}
          />
        
      </div>


      <div className="container flex p-0 mt-8">
        <div className="flex items-center flex-1 mr-4 transition duration-300 transform rounded-md h-72 hover:-translate-y-2" style={{ backgroundColor: "#5a78f0" }}>
          <div className="w-32">
            <img className="ml-auto" src="/createwallet.png" style={{ width: "87px", height: "87px" }} alt="123" />
            </div>
          <div className="flex flex-col flex-1 flex-shrink-0 px-10">
            <span className="text-2xl font-medium text-white">Create New Wallet</span>
            <span className="mt-2 text-white text-md"> Generate your own unique Ethereum wallet. Receive a public address (0x...) and choose a method for access and recovery. </span>
            
            <button className="self-start mt-6 text-white">
              <Link href="/create-wallet"><span className="self-start mt-6 text-white cursor-pointer ">Get Started</span></Link>
            </button>
          </div>
        </div>
        <div className="flex items-center flex-1 ml-4 transition duration-300 transform rounded-md h-72 hover:-translate-y-2 " style={{ backgroundColor: "#05c0a5" }}>

          <div className="w-32"><img className="ml-auto" src="/accesswallet.png" style={{ width: "87px", height: "87px" }} /></div>
          <div className="flex flex-col flex-1 flex-shrink-0 px-10">
            <span className="text-2xl font-medium text-white">Access My Wallet</span>
            <span className="mt-2 text-white text-md"> Connect to the blockchain using the wallet you choose. </span>
            <ul className="mt-2 text-xs font-semibold text-white">
              <li> &bull; Send and Swap Tokens</li>
              <li>&bull; Sign & Verify Messages</li>
              
            </ul>
            <button className="self-start mt-6 text-white">Access Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}