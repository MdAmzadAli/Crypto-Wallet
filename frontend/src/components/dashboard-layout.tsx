

import {  type ReactNode } from "react"
import { Sidebar } from "../components/sidebar"
import Navbar from "./navbar"
// import { ImportWalletModal } from "../components/import-wallet-modal"
// import { TransactionsView } from "../components/transactions-view"
// import { WalletView } from "../components/wallet-view"
// import { RotateCcw } from "lucide-react"

interface DashboardLayoutProps {
  children?: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
//   const [activeView, setActiveView] = useState<"wallets" | "transactions">("wallets")
//   const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  return (
    <div className="flex h-screen w-full flex-col ">
  <Navbar />

  <div className="flex flex-1 mt-[20.5px] mb-[20.5px] overflow-hidden text-white">
    <Sidebar />
    
    <div className="flex-1 overflow-auto">
      {children}
    </div>
  </div>
</div>

  )
}
