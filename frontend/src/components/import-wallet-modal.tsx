

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { queueManager } from "../utils/queue-manager"
import { deriveAddress } from "../utils/derive-address.ts"
import { generateMnemonic } from "../utils/derive-address.ts"
import { useSelector } from "react-redux"
import type { RootState } from "../state/store.ts"
interface ImportWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImportWalletModal({ isOpen, onClose }: ImportWalletModalProps) {
  const [walletName, setWalletName] = useState("")
  const [mnemonic, setMnemonic] = useState("")
  const [address, setAddress]=useState<string>("");
  const [isAddressOpen,setIsAddressOpen]=useState(false);
  const wallets = useSelector((state: RootState) => state.wallet);
  if (!isOpen) return null
  const handleGenerate = ()=>{
   console.log("Generating mnemonic...");
   setMnemonic(generateMnemonic());
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(walletName.trim() === ""){
      alert("Please fill in all fields.");
      return;
    }

      else if(isAddressOpen&&address.trim() === ""){
        alert("Please enter a valid address.");
        return;
      }
      else if(!isAddressOpen&&mnemonic.trim() === ""){
        alert("Please enter a valid mnemonic.");
        return;
    }
    if(wallets.some((wallet) => wallet.name === walletName)){
      alert("Wallet with this name already exists. Please choose a different name.");
      return;
    }
    let address_ = address;
    if(!isAddressOpen) address_=await deriveAddress(mnemonic);
    if(!address_){
      alert("Invalid mnemonic. Please check and try again.");
      return;
    }
    if(wallets.some((wallet) => wallet.address === address_)){
      alert("Wallet with this address already exists. Please choose a different address.");
      return;
    }
    queueManager.addToBalanceQueue({ name: walletName, address:address_ });
    queueManager.addToHistoryQueue({address:address_});
    console.log({ walletName, mnemonic })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="relative bg-[#1A1D22] rounded-lg w-full max-w-md p-6 shadow-lg">
   
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-400 hover:text-white hover:cursor-pointer"
      aria-label="Close"
    >
      <X className="h-5 w-5" />
    </button>

    <div className="flex justify-center mb-6">
      <h2 className="text-xl font-semibold text-white">Import Wallet</h2>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Enter your wallet name:</label>
        <input
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          className="w-full bg-[#111418] border border-gray-700 rounded-md p-2 text-white"
          required
        />
      </div>

      {!isAddressOpen && (
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">
            Enter your Mnemonic: or{" "}
            <span
              className="hover:cursor-pointer text-white underline"
              onClick={handleGenerate}
            >
              Generate
            </span>
          </label>
          <textarea
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            className="w-full bg-[#111418] border border-gray-700 rounded-md p-2 text-white h-24"
            required
          />
        </div>
      )}

      {isAddressOpen && (
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Enter your Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#111418] border border-gray-700 rounded-md p-2 text-white h-24"
            required
          />
        </div>
      )}

      <div className="flex justify-center mb-2">
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 hover:cursor-pointer text-white py-2 px-6 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>

    <div className="flex justify-center">
      <button
        onClick={() => setIsAddressOpen(!isAddressOpen)}
        className="text-white text-xs hover:underline hover:cursor-pointer"
      >
        Enter {isAddressOpen ? "Mnemonic" : "Address"}
      </button>
    </div>
  </div>
</div>


  )
}
