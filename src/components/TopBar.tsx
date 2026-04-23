import { Search, Bell, HelpCircle } from "lucide-react";

export default function TopBar() {
  return (
    <header className="fixed top-0 right-0 h-16 bg-white border-b border-[#DEE2E6] flex justify-between items-center px-6 z-40 w-[calc(100%-16rem)] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center bg-slate-50 px-4 py-2 rounded border border-[#DEE2E6] w-96 group focus-within:border-[#003366] transition-colors">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-600 ml-2" 
          placeholder="Search datasets or reports..." 
          type="text"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-slate-500">
          <Bell className="w-5 h-5 cursor-pointer hover:text-[#003366]" />
          <HelpCircle className="w-5 h-5 cursor-pointer hover:text-[#003366]" />
        </div>
        <div className="h-8 w-px bg-[#DEE2E6]"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-slate-900 leading-none">Corporate Admin</p>
            <p className="text-[10px] text-slate-500">FairLens Enterprise</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#00336610] overflow-hidden border border-[#DEE2E6]">
            <img 
              alt="User" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
