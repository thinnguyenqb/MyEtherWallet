import fromnow from 'fromnow'
import Header from '../../components/Header'
import instance from '../../util/axios'
import Link from 'next/link'
export default function Explorer({ blocks, transactions }) {
  console.log(transactions)
  return (
    <div className="min-h-screen bg-white">
      <div>
        <Header left />
        {/* {transactions.slice(0,8).map(tx => <div key={tx.hash} className="px-4 py-3 mt-2 mb-2 text-sm text-gray-600 break-all bg-gray-200 rounded-lg">
                Hash : {tx.hash}
                </div>) } */}


        <div className="container">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800">Latest Blocks</span>
              <Link href={"/explorer/blocks"}><span className="px-4 py-1 text-blue-600 border border-gray-300 rounded-lg">View All</span></Link>
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
          <div className="flex flex-col mt-16 mb-16">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800">Latest Transactions</span>
              <button className="px-4 py-1 text-blue-600 border border-gray-300 rounded-lg">View All</button>
            </div>
            <span className="text-sm font-medium text-gray-600">The most recently published unconfirmed transactions</span>
            <div className="flex w-full mt-6">
              <div className="text-sm text-gray-500" style={{ width: "40%" }}>Hash</div>
              <div className="text-sm text-gray-500" style={{ width: "25%" }}>Time</div>
              <div className="text-sm text-gray-500" style={{ width: "25%" }}>Amount</div>
              <div className="text-sm text-gray-500" style={{ width: "10%" }}>Type</div>
            </div>

            {transactions?.length > 0 && transactions.map(tx => <div key={tx.id} className="flex w-full mt-6">
              <div className="pr-2 text-sm text-gray-800 break-all" style={{ width: "40%" }}>{tx.hash}</div>
              <div className="text-sm text-gray-800" style={{ width: "25%" }}>{fromnow(Number(tx.time) * 1000)}</div>
              <div className="text-sm text-gray-800 break-all" style={{ width: "25%" }}>{tx.data.inputs.reduce((prev, cur) => prev.amount > Number(cur.amount) ? prev : cur, {amount: 0}).amount}</div>
              <div className="text-sm text-gray-800" style={{ width: "10%" }}>{tx.type}</div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}


Explorer.getInitialProps = async () => {
  const { data } = await instance.get('blockchain/blocks')
  const {data : tdata} = await instance.get('blockchain/transactions/regular')
  
  return { blocks: data.slice(Math.max(data.length - 8, 0)).reverse(), transactions :  tdata.slice(Math.max(tdata.length - 8, 0)).reverse()}
}