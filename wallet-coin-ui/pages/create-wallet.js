import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Modal from '../components/Modal';
import { ExclamationIcon, CheckCircleIcon } from '@heroicons/react/outline'
import { Dialog } from '@headlessui/react'
import _ from 'lodash'
const customWidth = { width: "28rem" }


export default function CreateWallet() {
  const [tab, setTab] = useState("2");
  const [isModalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState(false)
  const [phrase, setPhrase] = useState(null)
  const [phraseValidation, setPhraseValidation] = useState(null)
  const [isSuccess, setSuccess] = useState(false)
  const ref = useRef()
  const cancelButtonRef = useRef()

  useEffect(() => {
    import('../lib/bip39').then(myModule => {
      ref.current = myModule;
      setPhrase(ref.current.default.generate(128).split(" "))
    });
  }, [])

  const handleRandomPhrase = () => {
    if (ref.current?.default) {
      setPhrase(ref.current.default.generate(128).split(" "))
    }
  }

  const handleModalOpen = () => {
    if (!isModalOpen) {
      const currentPhrase = [...phrase];
      const idx1 = _.random(0, 2);
      const idx2 = _.random(3, 4);
      const idx3 = _.random(5, 7);
      const idx4 = _.random(8, 9);
      const idx5 = _.random(10, 11);

      currentPhrase[idx1] = "";
      currentPhrase[idx2] = "";
      currentPhrase[idx3] = "";
      currentPhrase[idx4] = "";
      currentPhrase[idx5] = "";
      setPhraseValidation(currentPhrase)
      setError(false)
      setSuccess(false)
    }
    setModalOpen(prev => !prev)
  }


  const handleVerifyPhrase = () => {
    const isEqual = _.isEqual(phraseValidation, phrase)
    if (!isEqual) {
      setError(true)
    }
    else setSuccess(true)
  }

  const handlePhraseChange = (value, index) => {
    setPhraseValidation(prev => {
      prev[index] = value
      return prev
    })
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div >
          <Header />

          <div className="mt-16 text-center">
            <h1 className="text-3xl font-light">Get a New Wallet</h1>
            <span className="font-light text-gray-600">Already have a wallet ? Access My Wallet</span>



            <div className="flex mx-auto mt-10 bg-white rounded-lg shadow-sm" style={customWidth}>
              <div className="flex-1 py-4 text-center text-gray-500 border-b-2 hover:border-purple-300">Keystore File</div>
              <div className="w-px h-full bg-gray-100"></div>
              <div className="flex-1 py-4 font-semibold text-center text-purple-700 border-b-2 border-purple-700">Mnemonic Phrase</div>
            </div>

            <div className="flex flex-col items-center py-5 mx-auto mt-10 bg-white rounded-lg shadow-sm flex-start px-7" style={customWidth}>
              <div className="text-xl font-medium text-center">Your Mnemonic Phrase</div>
              <button onClick={handleRandomPhrase} className="self-end text-xs text-blue-500 focus:outline-none">Random</button>
              <div className="grid grid-cols-3 pt-4 mt-5 gap-x-4 gap-y-8 pb-7">
                {phrase && phrase.map((word, index) => <div key={word} className="px-6 py-2 font-medium text-gray-700 bg-gray-100 rounded-full"><span className="text-xs text-gray-400">{index + 1}.</span>{word}</div>)}
              </div>
              <button onClick={handleModalOpen} className="w-full font-medium text-white bg-green-600 rounded-lg h-14">I Wrote Down My Mnemonic Phrase</button>
              <p className="mt-5 text-sm font-medium text-gray-600"><span className="text-red-700">DO NOT FORGET</span> to save your mnemonic phrase. You will need this to access your wallet.

            </p>

            </div>

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
                      Please enter and fill out the empty boxes below to verify your mnemonic phrase key.
                      </p>
                  </div>
                </div>
              </div>
            </div>

            {!isSuccess && <div className="mt-10">
              <div className="grid grid-cols-3 pt-6 mt-5 gap-x-4 gap-y-8 pb-7">
                {phraseValidation && phraseValidation.map((word, index) => <input key={word + index} disabled={word !== ""} className="px-6 py-2 font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg" defaultValue={word} onChange={ev => handlePhraseChange(ev.target.value, index)} />)}
              </div>
            </div>}

            {error && <div className="mt-4 text-sm font-semibold text-center text-red-700">Mnemonic Phrase not match, please try again.</div>}
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