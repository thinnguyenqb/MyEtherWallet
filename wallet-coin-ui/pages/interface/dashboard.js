import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import {
  ChipIcon,
  QrcodeIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { useWallet } from '../../util/store'
import {useRouter} from 'next/router'
import instance from '../../util/axios'
const gridStyle = {
  gridColumnGap: 0,
  gridTemplateColumns: '270px 1fr',
}

const contentBackground = {
  backgroundColor: '#f2f4fa',
}

const avatarStyle = {
  width: '35px',
  height: '35px',
  backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADY0lEQVR4Xu2dsU1DQRAF70sETohohgYcug9kOXSOCNyBA3qhASqgCyJSJChigtHqD/myd+/Nf7fA57zdDue/JX59Xi5id7/18/2uLmILAFX/FQAlgEpgCaDKv0qAZoBmAPkZdNs3AzQDqAQ2A6jyNwOsZoBmAPkZdNs3AzQDqAQ2A6jyNwM0A/S3gP4YZIZQR4Cp/uoI6AjY+xEgP4C7b68fAbt3QBYgAGQD7PYBYDsg9w8A2QC7fQDYDsj9A0A2wG4fALYDcv8AkA2w2weA7YDcPwBkA+z2AWA7IPcPANkAu30A2A7I/QNANsBuHwC2A3L/7XT9QvcD2K81P34/qBL+PP2q/en/VQQAtC8A5FeaSgD2Um0JUAI0AxAGOgI6Agg/uLYhsJ8CEETNAEi+tToCOgIgQqy8I6AjABHUEYDk6wjQ77nrF0H9Igg+w6y8IbAhkBEEqxsCGwIRQg2BSL6GQCgfLz++vfNvAr7Dx+sLqPZLcQLYWwgA5kAAMP1WCQAFpOUlAFOwBGD6lQBQP1xeAjAJSwCmXwkA9cPlJQCTsARg+pUAUD9cXgIwCUsApl8JAPXD5SUAk7AEYPqVAFA/XF4CMAlLAKZfCQD1w+UlAJMQJ4B9PwDb/vzq3b8SNt9CtoMAYPqNrw6A8RayDQQA0298dQCMt5BtIACYfuOrA2C8hWwDAcD0G18dAOMtZBsIAKbf+OoAGG8h20AAMP3GVwfAeAvZBgKA6Te+OgDGW8g2gAG4Hc7o8wLoJU3T/7uW2bcWfaGF3lGEPzEkABgCATD8hg1mfwkw/qXKAIC3dDUDsDuOmgHoIyjXNwM0AyAESwAkn19cApQAiMISAMnnF5cAJQCisARA8vnFJUAJgCgsAZB8fnEJUAIgCksAJJ9frCfA6co+O9iXsBUQBfAFEaR5tb4CAeB7oK4gAFT5/eYB4HugriAAVPn95gHge6CuIABU+f3mAeB7oK4gAFT5/eYB4HugriAAVPn95gHge6CuIABU+f3mAeB7oK4gAFT5/eYYgD4vwDURXxBBXwgJgABwFdh59xIgAJACzQBIPr+4BPA9UFcQAKr8fvMA8D1QVxAAqvx+8wDwPVBXEACq/H7zAPA9UFcQAKr8fvMA8D1QVxAAqvx+8wDwPVBXQAH4B5SBrZ9x9EfyAAAAAElFTkSuQmCC");`,
}

const HeaderRight = ({ className }) => {
  return (
    <div className="flex items-center h-full ml-auto">
      <Link href="/scan" className="mr-6">
        <span className="mr-6 font-light text-gray-800">Transaction History </span>
      </Link>
      <div className="settings-container">
        <div className="" style={avatarStyle}></div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { wallet, change } = useWallet()
  const router = useRouter()
  useEffect(() => {
    if (!wallet.address) {
        router.replace('/access-wallet')
    }
    ;(async () => {
      try {
        const { data } = await instance.get('operator/' + wallet.address + '/balance')
        change(data)
      } catch (err) {}
    })()
  }, [wallet?.address])
  return (
    <div className="flex flex-col h-screen">
      <Header container={false} right={HeaderRight} />

      <div className="grid flex-1 w-full bg-gray-200" style={gridStyle}>
        <div className="w-full h-full p-8 bg-white shadow-sm">
          <div className="flex items-center h-20 text-gray-700">
            <ChipIcon className="w-6 mr-2 text-xl" /> <span className="text-lg">Dashboard</span>
          </div>

          <div className="flex items-center h-20 text-gray-400">
            <CurrencyDollarIcon className="w-6 mr-2 text-xl" />{' '}
            <span className="text-lg">Send</span>
          </div>
        </div>
        <div className="flex flex-col p-6" style={contentBackground}>
          <div className="grid w-full grid-cols-3 gap-5">
            <div
              className="flex h-40 px-10 rounded-md shadow-sm py-7"
              style={{ backgroundColor: '#7070e3' }}
            >
              <QrcodeIcon className="flex-shrink-0 w-12 h-12 mt-2 mr-5 text-white" />
              <div className="flex flex-col text-white">
                <span className="text-lg font-semibold">Address</span>
                <span className="text-sm text-white break-all">{wallet.address}</span>
              </div>
            </div>
            <div
              className="flex h-40 px-10 rounded-md shadow-sm py-7"
              style={{ backgroundColor: '#5a78f0' }}
            >
              <CurrencyDollarIcon className="flex-shrink-0 w-12 h-12 mt-2 mr-5 text-white" />
              <div className="flex flex-col text-white">
                <span className="text-lg font-semibold">Balance</span>
                <span className="text-2xl font-light text-white break-all">{wallet.balance}</span>
              </div>
            </div>
            <div
              className="flex h-40 px-10 rounded-md shadow-sm py-7"
              style={{ backgroundColor: '#25b0e8' }}
            >
              <InformationCircleIcon className="w-12 h-12 mt-2 mr-5 text-white" />
              <div className="flex flex-col text-white">
                <span className="text-lg font-semibold">Network</span>
                <span className="text-sm text-white break-all">Deo biet ghi gi</span>
              </div>
            </div>
          </div>

          <div className="grid flex-1 w-full grid-cols-3 gap-5 mt-5">
            <div className="bg-white rounded-md"></div>
            <div className="h-40 col-span-2 bg-white rounded-md "></div>
          </div>
        </div>
      </div>
    </div>
  )
}