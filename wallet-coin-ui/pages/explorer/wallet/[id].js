import fromnow from 'fromnow'
import Header from '../../../components/Header'
import instance from '../../../util/axios'
import { useRouter } from 'next/router'

export default function Walletss({ txs, balance }) {
  
  const router = useRouter()
  const { id } = router.query
  
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
              <span className="text-xl font-medium text-gray-800">Address</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Information of this wallet</span>

            <div className="flex mt-4">
              <div className="text-gray-600" style={{ width: "20%" }}>Address : </div>
              <div className="text-gray-800">{id}</div>
            </div>

            <div className="flex mt-2">
              <div className="text-gray-600" style={{ width: "20%" }}>Format : </div>
              <div className="px-4 py-1 text-white bg-blue-400 rounded-md ring-2 ring-blue-600">Base58</div>
            </div>


            <div className="flex mt-2">
              <div className="text-gray-600" style={{ width: "20%" }}>Transactions : </div>
              <div className="text-gray-800">{txs.length}</div>
            </div>
           

           

            <div className="flex mt-2">
              <div className="text-gray-600" style={{ width: "20%" }}>Balance : </div>
              <div className="text-gray-800">{balance}</div>
            </div>

           
            {/* 
            <div className="flex w-full mt-6">
              <div className="text-sm text-gray-500" style={{ width: "18%" }}>Height</div>
              <div className="text-sm text-gray-500" style={{ width: "25%" }}>Mined</div>
              <div className="text-sm text-gray-500" style={{ width: "40%" }}>Miner</div>
              <div className="text-sm text-gray-500" style={{ width: "17%" }}>Nonce</div>
            </div>
            {blocks?.length > 0 && blocks.map(block => <div key={block.index} className="flex w-full mt-6">
              <div className="text-sm text-gray-800" style={{ width: "18%" }}>{block.index}</div>
              <div className="text-sm text-gray-800" style={{ width: "25%" }}>{fromnow(Number(block.timestamp) * 1000)}</div>
              <div className="text-sm text-gray-800 break-all" style={{ width: "40%" }}>{block.transactions[0].data.outputs[0].address}</div>
              <div className="text-sm text-gray-800" style={{ width: "17%" }}>{block.nonce}</div>
            </div>)}
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
            </div>)} */}
          </div>
        </div>
      </div>
    </div>
  )
}


// Explorer.getInitialProps = async () => {
//   const { data } = await instance.get('blockchain/blocks')
//   const {data : tdata} = await instance.get('blockchain/transactions')

//   return { blocks: data.slice(Math.max(data.length - 8, 0)).reverse(), transactions :  tdata.slice(Math.max(tdata.length - 8, 0)).reverse()}
// }


Walletss.getInitialProps = async (ctx) => {
  const { data:txs } = await instance.get('blockchain/transactions?address=' + ctx.query.id)
  const { data: {balance} } = await instance.get('operator/' + ctx.query.id + '/balance')
  return { txs , balance}
}