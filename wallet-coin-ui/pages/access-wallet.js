import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { ExclamationIcon, CheckCircleIcon } from '@heroicons/react/outline'
import { Dialog } from '@headlessui/react'
import _ from 'lodash'
import axios from '../util/axios'
import Link from 'next/link'
import { useWallet } from '../util/store'
import { useRouter } from 'next/router'
import { route } from 'next/dist/next-server/server/router'

const customWidth = { width: '28rem' }

export default function CreateWallet() {
  const [tab, setTab] = useState('1')
  const [isModalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState(false)
  const [phrase, setPhrase] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [phraseValidation, setPhraseValidation] = useState(null)
  const [isSuccess, setSuccess] = useState(false)
  const ref = useRef()
  const router = useRouter()
  const cancelButtonRef = useRef()
  const { wallet: z, change } = useWallet()
  useEffect(() => {
    import('../lib/bip39').then((myModule) => {
      ref.current = myModule
      const phrases = ref.current.default.generate(128)
      console.log(ref.current.default.toSeed(phrases, 'mysecret'))
      setPhrase(phrases.split(' '))
    })
  }, [])

  const handleRandomPhrase = () => {
    if (ref.current?.default) {
      setPhrase(ref.current.default.generate(128).split(' '))
    }
  }

  const textareaRef = useRef(null)

  const handleModalOpen = () => {
    if (!isModalOpen) {
      const currentPhrase = [...phrase]
      const idx1 = _.random(0, 2)
      const idx2 = _.random(3, 4)
      const idx3 = _.random(5, 7)
      const idx4 = _.random(8, 9)
      const idx5 = _.random(10, 11)

      currentPhrase[idx1] = ''
      currentPhrase[idx2] = ''
      currentPhrase[idx3] = ''
      currentPhrase[idx4] = ''
      currentPhrase[idx5] = ''
      setPhraseValidation(currentPhrase)
      setError(false)
      setSuccess(false)
    }
    setModalOpen((prev) => !prev)
  }

  useEffect(() => {
    if (z.address) {
      router.replace('/interface/dashboard')
    }
  }, [z])
  const handleVerifyPhrase = () => {
    const isEqual = _.isEqual(phraseValidation, phrase)
    if (!isEqual) {
      setError(true)
    } else setSuccess(true)
  }

  const handlePhraseChange = (value, index) => {
    setPhraseValidation((prev) => {
      prev[index] = value
      return prev
    })
  }

  const handleGenNewWallet = async () => {
    const { data } = await axios.post('operator/wallet')
    setWallet(data)
  }

  useEffect(() => {
    if (tab === '1') {
      handleGenNewWallet()
    }
  }, [tab])

  const handleLogin = async () => {
    if (!textareaRef.current) return
    const { data } = await axios.get('operator/wallets/' + textareaRef.current.value)
    change({ address: data })

    router.replace('/interface/dashboard')
  }

  const handleKeyDown = (ev) => {
    
    if (ev.key == 'Enter') {
      ev.preventDefault();
      handleLogin()
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div>
          <Header />

          <div className="pb-16 mt-16 text-center">
            <h1 className="text-3xl font-light">Access Your Wallet</h1>
            <span className="font-light text-gray-600">
              Do not have any wallet? Create new one!
            </span>

            <div className="flex mx-auto mt-10 bg-white rounded-lg shadow-sm" style={customWidth}>
              <div
                tabIndex={0}
                onClick={() => setTab('1')}
                className={`flex-1 py-4 text-center text-gray-500 border-b-2  ${
                  tab === '1'
                    ? 'border-purple-700 text-purple-700 font-semibold'
                    : 'hover:border-purple-300'
                }`}
              >
                Private Key
              </div>
              <div className="w-px h-full bg-gray-100"></div>
              <div
                tabIndex={0}
                onClick={() => setTab('2')}
                className={`flex-1 py-4 text-center  border-b-2 ${
                  tab === '2'
                    ? 'border-purple-700 text-purple-700 font-semibold'
                    : 'hover:border-purple-300'
                }`}
              >
                Mnemonic Phrase
              </div>
            </div>

            {tab === '1' && (
              <div
                className="flex flex-col items-center py-5 mx-auto mt-10 bg-white rounded-lg shadow-sm flex-start px-7"
                style={customWidth}
              >
                <div className="text-xl font-medium text-center">Your Private Key(s) </div>

                <div className="flex flex-col w-full pt-4 mt-5 text-left gap-x-4 pb-7">
                  <span className="mb-3 text-sm font-semibold">Private Key</span>
                  <textarea
                    ref={textareaRef}
                    onKeyPress={handleKeyDown}
                    className="px-4 py-2 mt-2 border border-gray-200 rounded-md shadow-sm overflow-ellipsis"
                    placeholder="Input your private key."
                  ></textarea>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-5 font-medium text-white bg-green-600 rounded-lg"
                >
                  Access Wallet
                </button>

                <p className="mt-5 text-sm font-medium text-gray-600">
                  <span className="text-red-700">Please</span> keep up your private key. You will
                  need this to access your wallet.
                </p>
              </div>
            )}

            {tab === '2' && (
              <div
                className="flex flex-col items-center py-5 mx-auto mt-10 bg-white rounded-lg shadow-sm flex-start px-7"
                style={customWidth}
              >
                <div className="text-xl font-medium text-center">Your Mnemonic Phrase</div>
                <button
                  onClick={handleRandomPhrase}
                  className="self-end text-xs text-blue-500 focus:outline-none"
                >
                  Random
                </button>
                <div className="grid grid-cols-3 pt-4 mt-5 gap-x-4 gap-y-8 pb-7">
                  {phrase &&
                    phrase.map((word, index) => (
                      <div
                        key={word}
                        className="px-6 py-2 font-medium text-gray-700 bg-gray-100 rounded-full"
                      >
                        <span className="text-xs text-gray-400">{index + 1}.</span>
                        {word}
                      </div>
                    ))}
                </div>
                <button
                  onClick={handleModalOpen}
                  className="w-full font-medium text-white bg-green-600 rounded-lg h-14"
                >
                  I Wrote Down My Mnemonic Phrase
                </button>
                <p className="mt-5 text-sm font-medium text-gray-600">
                  <span className="text-red-700">DO NOT FORGET</span> to save your mnemonic phrase.
                  You will need this to access your wallet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} setOpen={handleModalOpen}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="flex-col sm:flex sm:items-start">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Verification
                  </Dialog.Title>
                  <div className="mt-1">
                    <p className="text-sm text-gray-500">
                      Please enter and fill out the empty boxes below to verify your mnemonic phrase
                      key.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!isSuccess && (
              <div className="mt-10">
                <div className="grid grid-cols-3 pt-6 mt-5 gap-x-4 gap-y-8 pb-7">
                  {phraseValidation &&
                    phraseValidation.map((word, index) => (
                      <input
                        key={word + index}
                        disabled={word !== ''}
                        className="px-6 py-2 font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg"
                        defaultValue={word}
                        onChange={(ev) => handlePhraseChange(ev.target.value, index)}
                      />
                    ))}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 text-sm font-semibold text-center text-red-700">
                Mnemonic Phrase not match, please try again.
              </div>
            )}
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleVerifyPhrase}
            >
              Verify
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleModalOpen}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}