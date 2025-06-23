// import { DashboardLayout } from "../src/components/dashboard-layout"

import {  Routes, Route } from "react-router-dom"
import Wallet from "./pages/wallet"
import Transactions from "./pages/transactions"
import { useInitQueueManager } from "./hooks/useInitQueueManager"


export default function Home() {
  useInitQueueManager();
  return (<>
  
   
    <Routes>
      <Route path="/" element={<Wallet />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
 
 
  </>)
}