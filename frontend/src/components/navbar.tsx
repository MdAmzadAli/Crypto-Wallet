import { RotateCcw } from "lucide-react";
import { useLocation } from "react-router-dom";
import { queueManager } from "../utils/queue-manager";
import { useSelector,useDispatch } from "react-redux";
import { clear as clearWallet } from "../state/slices/wallet";
import { clear } from "../state/slices/transaction";
import type { RootState } from "../state/store";

export default function Navbar(){
    const location=useLocation();
    const dispatch = useDispatch();
    const isHomePage = location.pathname === "/";
    const {status,wallets} = useSelector((state: RootState) => ({
        wallets:state.wallet,
        status:state.status.value
    }));
    // const [status, setStatus] = useState<"idle"|"syncing"|"synced">("idle");
    
    const handleSynced=()=>{
        if(wallets.length==0){alert("No Item to be Synced");return;}
        
        for (let i=wallets.length-1;i>=0;i--){
            queueManager.addToBalanceQueue({name:wallets[i].name,address:wallets[i].address});
            queueManager.addToHistoryQueue({address:wallets[i].address});
        }
        dispatch(clearWallet());
        dispatch(clear());

    

    }

    return (
    <div className="bg-black flex flex-col p-0">
 
  <div className="relative h-[40px]">
    {status !== "idle" && (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 text-xs pointer-events-none">
        {status === "syncing" && (
          <div className="bg-yellow-300 text-black px-4 py-2 rounded shadow">
            🔄 Syncing...
          </div>
        )}
        {status === "synced" && (
          <div className="bg-green-400 text-white px-4 py-2 rounded shadow">
            ✅ Synced
          </div>
        )}
      </div>
    )}
  </div>

  
  <div className="flex h-[39.5px] flex-row items-center justify-between border-b border-[#1E2126] px-3">
    <div className={`${isHomePage ? "invisible" : ""} flex items-center ml-2 text-lg font-medium`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="#ffffff" strokeWidth="2" />
        <path d="M12 6L8 8V16L12 18L16 16V8L12 6Z" stroke="#ffffff" strokeWidth="2" />
      </svg>
      <span className="ml-2 font-extrabold text-white">cySync</span>
    </div>

    <button
      onClick={handleSynced}
      className={`${
        status !== "idle" ? "pointer-events-none" : ""
      } mr-[40px] w-[73px] h-[20px] font-bold flex items-center justify-between text-[#E0B36A] hover:cursor-pointer text-sm`}
    >
      <RotateCcw className={`h-4 w-4 ${!isHomePage ? "hidden" : ""}`} />
      Synced
      <RotateCcw className={`h-4 w-4 ${isHomePage ? "hidden" : ""}`} />
    </button>
  </div>
</div>


    )
}