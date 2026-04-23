import { useState } from "react";
import { 
  LayoutDashboard, 
  Upload, 
  BarChart3, 
  FileText, 
  Settings, 
  Plus,
  Search,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Components
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DashboardView from "./components/DashboardView";
import UploadView from "./components/UploadView";
import AnalysisView from "./components/AnalysisView";

export type View = "dashboard" | "upload" | "analysis" | "reports" | "settings";

export default function App() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [analysisData, setAnalysisData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#f9f9fe] text-[#1a1c1f] flex">
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="flex-1 ml-[220px] flex flex-col min-h-screen bg-[#F1F5F9]">
        {/* Top Header */}
        <header className="px-8 flex justify-between items-center h-16 w-full gap-4 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0]">
          <div className="flex items-center bg-[#F1F5F9] px-4 py-1.5 rounded-lg border border-[#E2E8F0] w-96 transition-all focus-within:border-[#38BDF8]">
            <Search className="w-4 h-4 text-[#64748B]" />
            <input 
              className="bg-transparent border-none focus:ring-0 text-sm w-full text-[#1E293B] ml-2" 
              placeholder="Search datasets or reports..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-6">
            <Bell className="w-5 h-5 text-[#64748B] cursor-pointer hover:text-[#0F172A]" />
            <div className="w-px h-6 bg-[#E2E8F0]" />
            <div className="flex items-center gap-3">
               <div className="text-right">
                 <p className="text-xs font-bold text-[#0F172A]">Corporate Admin</p>
                 <p className="text-[10px] text-[#64748B]">v4.2 Analysis Engine</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-[#E2E8F0] border border-[#E2E8F0] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" className="object-cover w-full h-full" alt="Admin" />
               </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8 mt-16 max-w-7xl mx-auto w-full flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === "dashboard" && <DashboardView onStartNew={() => setActiveView("upload")} />}
              {activeView === "upload" && (
                <UploadView 
                  onAnalysisComplete={(data) => {
                    setAnalysisData(data);
                    setActiveView("analysis");
                  }} 
                />
              )}
              {activeView === "analysis" && (
                <AnalysisView data={analysisData} />
              )}
              {(activeView === "reports" || activeView === "settings") && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Settings className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">Module in Development</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Technical Footer */}
        <footer className="px-8 py-6 border-t border-slate-200 bg-white flex justify-between items-center text-[10px] text-slate-400 font-medium overflow-hidden">
          <div className="flex gap-4">
            <span>Model Hash: 0x82f...a12</span>
            <span>Audit Logs: Enabled</span>
            <span>Engine Version: 1.4.0-stable</span>
          </div>
          <div>
            © 2024 FairLens AI Ecosystem.
          </div>
        </footer>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setActiveView("upload")}
        className="fixed bottom-8 right-8 bg-[#003366] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform z-50 flex items-center justify-center group"
      >
        <Plus className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold text-sm whitespace-nowrap">
          New Analysis
        </span>
      </button>
    </div>
  );
}
