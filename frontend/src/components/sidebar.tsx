import { Wallet, History } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const activeView = currentPath === "/transactions" ? "Last Transactions" : "Wallets";

  const items=[
    { label: "Wallets", icon: <Wallet className="h-4 w-4 mr-2" />, path: "/" },
    { label: "Last Transactions", icon: <History className="h-4 w-4 mr-2" />, path: "/transactions" },
    ];

  return (
    <div className="w-[199px] bg-[#161C23] ml-[20px] pt-[47px] flex flex-col rounded-lg">
      <div className="flex-1">
        <nav className="space-y-1 px-2">
         {items.map((item,index)=>
         <button
            onClick={() => navigate(`${item.path}`)}
            key={index}
            className={`w-full flex items-center px-3 py-2 text-xs  hover:cursor-pointer border-l-4 ${
              activeView === item.label ? "border-[#C0996F] text-[#E2C19D]" : "border-transparent text-white hover:bg-[#111418]"
            }`}
          >
            {item.icon}
           {item.label} 
          </button>
        )}
        
        </nav>
      </div>
      <div className="p-3">
        <button className="w-full bg-[#4B3C2B] hover:bg-[#7D6A45] text-white py-2 rounded-md text-xs">Support</button>
      </div>
    </div>
  );
}
