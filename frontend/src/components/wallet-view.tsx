

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { ImportWalletModal } from "./import-wallet-modal"
import { FaCirclePlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store"
import { useDispatch } from "react-redux"
import { deleteWallet } from "../state/slices/wallet"
// import { colors } from "../utils/color"
// interface Wallet {
//   id: number
//   name: string
//   amount: string
// }
// mkUNMmtaihdY2vj51CUykyGoW68f4dg1HR
export function WalletView() {
  // const [wallets, setWallets] = useState<Wallet[]>([
  //   { id: 0, name: "BITCOIN", amount: "BTC 0.00256" },
  //   { id: 1, name: "BITCOIN 1", amount: "BTC 0.00256" },
  //   { id: 2, name: "BITCOIN 2", amount: "BTC 0.00256" },
  //   { id: 3, name: "BITCOIN 3", amount: "BTC 0.00256" },
  //   { id: 4, name: "BITCOIN 4", amount: "BTC 0.00256" },
  //   { id: 5, name: "BITCOIN", amount: "BTC 0.00256" },
  //   { id: 6, name: "BITCOIN 1", amount: "BTC 0.00256" },
  //   { id: 7, name: "BITCOIN 2", amount: "BTC 0.00256" },
  //   { id: 8, name: "BITCOIN 3", amount: "BTC 0.00256" },
  //   { id: 9, name: "BITCOIN 4", amount: "BTC 0.00256" },
  //   { id: 10, name: "BITCOIN", amount: "BTC 0.00256" },
  //   { id: 11, name: "BITCOIN 1", amount: "BTC 0.00256" },
  //   { id: 12, name: "BITCOIN 2", amount: "BTC 0.00256" },
  //   { id: 13, name: "BITCOIN 3", amount: "BTC 0.00256" },
  //   { id: 14, name: "BITCOIN 4", amount: "BTC 0.00256" },
  // ]);
  const dispatch=useDispatch();
  const wallets = useSelector((state: RootState) => state.wallet);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  return (

    <div className="px-3 pb-3 mt-[20px]">
         
      <div className={`rounded-lg p-4`}>
        <div className="mr-2 flex justify-end mb-3">
            <button
                  onClick={() => setIsImportModalOpen(true)}
                  className="bg-[#161C23] text-[#BEB4A8]  hover:cursor-pointer border-2 border-[#242830] rounded-md px-3 py-1.5 text-xs flex items-center hover:bg-[#252830]"
                >
                  <FaCirclePlus className="h-4 w-4 mr-1 text-[#85633E] bg-white rounded-full"/> IMPORT WALLET
                </button>
        </div>
        
        <div className="mb-4">
          <h2 className="ml-[20px] text-white text-xs border-b-[1px] border-[#161C23]">Total Coins - {wallets.length}</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-3 text-xs text-gray-400 px-2">
          <div>Coin</div>
          <div>Holding</div>
          <div>Actions</div>
        </div>
        <div className="space-y-2">
          {wallets.map((wallet, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-2 rounded-md items-center bg-[#161C23]`}
            >
              <div className="flex items-center">
                <div className="w-5 h-5 bg-amber-700 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-xs font-bold">₿</span>
                </div>
                <span className="text-xs text-white">{wallet.name}</span>
              </div>
              <div className="text-xs text-white">{wallet.amount}</div>
              <div className="flex items-center">
                <button onClick={()=>{dispatch(deleteWallet({address:wallet.address}))}} className="text-gray-400 hover:cursor-pointer hover:text-gray-200">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImportWalletModal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} />
    </div>
  )
}
