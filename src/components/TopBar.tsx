import { Search, Bell, HelpCircle } from "lucide-react";

export default function TopBar() {
  return (
    <header className="fixed top-0 right-0 h-16 bg-white border-b border-border-subtle flex justify-between items-center px-8 z-40 w-[calc(100%-16rem)] shadow-card">
      <div className="flex items-center bg-slate-50 px-4 py-2 rounded-lg border border-border-subtle w-96 group focus-within:border-secondary transition-all">
        <Search className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-secondary" />
        <input 
          className="bg-transparent border-none focus:ring-0 text-[13px] w-full text-primary ml-3 font-medium placeholder:text-slate-400" 
          placeholder="Search for datasets or reports..." 
          type="text"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-5 text-on-surface-variant">
          <div className="relative">
             <Bell className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" />
             <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-error-dark rounded-full border-2 border-white"></span>
          </div>
          <HelpCircle className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" />
        </div>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-primary leading-none mb-1">Corporate Admin</p>
            <p className="text-[10px] text-on-surface-variant font-bold tracking-tighter uppercase">Enterprise Access</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden border border-border-subtle group-hover:border-secondary transition-colors ring-4 ring-slate-50">
            <img 
              alt="User" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
