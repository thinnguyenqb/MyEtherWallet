import fromnow from 'fromnow'
import Header from '../../../components/Header'
import instance from '../../../util/axios'
import Link from 'next/link'
export default function Explorer({ blocks }) {
  console.log(blocks)
  return (
    <div className="min-h-screen bg-white">
      <div>
        <Header left />
        {/* {transactions.slice(0,8).map(tx => <div key={tx.hash} className="px-4 py-3 mt-2 mb-2 text-sm text-gray-600 break-all bg-gray-200 rounded-lg">
                Hash : {tx.hash}
                </div>) } */}


        <div className="container mb-16">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800">Latest Blocks</span>
            </div>
            <span className="text-sm font-medium text-gray-600">The most recently mined blocks</span>

            <div className="flex w-full mt-6">
              <div className="text-sm text-gray-500" style={{ width: "18%" }}>Height</div>
              <div className="text-sm text-gray-500" style={{ width: "25%" }}>Mined</div>
              <div className="text-sm text-gray-500" style={{ width: "40%" }}>Miner</div>
              <div className="text-sm text-gray-500" style={{ width: "17%" }}>Nonce</div>
            </div>

            {blocks?.length > 0 && blocks.map(block => {
              const wlurl = block?.transactions.find(tx => tx.type === 'reward')?.data?.outputs[0]?.address || "Genesis Block";
              return <div key={block.index} className="flex w-full mt-6">
              <Link href={"/explorer/blocks/" + block.index}><div className="text-sm text-blue-500 hover:cursor-pointer hover:underline" style={{ width: "18%" }}>{block.index}</div></Link>
              <div className="text-sm text-gray-800" style={{ width: "25%" }}>{fromnow(Number(block.timestamp) * 1000)}</div>
              <Link href={"/explorer/wallet/" + wlurl}><div className="text-sm text-blue-500 break-all hover:cursor-pointer hover:underline" style={{ width: "40%" }}>{wlurl}</div></Link>
              <div className="text-sm text-gray-800" style={{ width: "17%" }}>{block.nonce}</div>
            </div>
            })}
          </div>

        </div>
      </div>
    </div>
  )
}


Explorer.getInitialProps = async () => {
  const { data } = await instance.get('blockchain/blocks')

  return { blocks: data.reverse() }
}