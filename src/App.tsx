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
    <div className="min-h-screen bg-slate-50 font-sans text-primary flex">
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="flex-1 ml-[256px] flex flex-col min-h-screen relative">
        {/* Top Header */}
        <TopBar />

        {/* Main Content Area */}
        <main className="p-8 pt-24 max-w-7xl mx-auto w-full flex-1">
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
        <footer className="px-8 py-6 border-t border-slate-200 bg-white flex justify-between items-center text-[10px] text-on-surface-variant font-bold tracking-tight uppercase overflow-hidden">
          <div className="flex gap-4 opacity-60">
            <span>Model Hash: 0x82f...a12</span>
            <span>Audit Logs: Enabled</span>
            <span>Engine Version: 1.4.0-stable</span>
          </div>
          <div className="opacity-60">
            © 2024 FairLens AI Ecosystem.
          </div>
        </footer>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setActiveView("upload")}
        className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform z-50 flex items-center justify-center group"
      >
        <Plus className="w-6 h-6 text-secondary" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold text-sm whitespace-nowrap">
          New Analysis
        </span>
      </button>
    </div>
  );
}
