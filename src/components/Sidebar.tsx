import { 
  LayoutDashboard, 
  Upload, 
  BarChart3, 
  FileText, 
  Settings
} from "lucide-react";
import { cn } from "../lib/utils";
import { View } from "../App";

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as View, icon: LayoutDashboard, label: "Dashboard Overview" },
    { id: "upload" as View, icon: Upload, label: "Dataset Manager" },
    { id: "analysis" as View, icon: BarChart3, label: "Bias Detection Engine" },
    { id: "reports" as View, icon: FileText, label: "Perception Mapping" },
    { id: "settings" as View, icon: Settings, label: "System Settings" }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] bg-[#0F172A] text-[#F1F5F9] flex flex-col py-6 px-4 z-50">
      <div className="px-2 mb-12 flex items-center gap-3">
        <span className="text-[#38BDF8] text-2xl font-black">◌</span>
        <h1 className="text-xl font-extrabold tracking-tight">FairLens</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-200 rounded-lg text-sm font-medium",
                isActive 
                  ? "bg-[#1E293B] text-[#38BDF8]" 
                  : "text-[#F1F5F9]/70 hover:bg-[#1E293B] hover:text-[#F1F5F9]"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
      
      <div className="mt-auto px-2 opacity-60">
        <div className="flex items-center gap-3 px-3 py-3 cursor-pointer text-xs font-medium grayscale">
           <Settings className="w-4 h-4" />
           <span>v4.2.0-stable</span>
        </div>
      </div>
    </aside>
  );
}
