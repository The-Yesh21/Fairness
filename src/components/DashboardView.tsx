import { 
  Rocket, 
  Activity,
  Users,
  Globe,
  TrendingUp,
  Download,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "../lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const stats = [
  { label: "Total datasets analyzed", value: "1,284", change: "+12%", sub: "Across 12 global regions", trend: "up" },
  { label: "Biases detected", value: "42", change: "Active Cases", sub: "14 high-severity alerts", trend: "alert" },
  { label: "Reports generated", value: "859", change: null, sub: "PDF / JSON / API Webhooks", trend: "down" }
];

const auditHistory = [
  { name: "User_Loan_Applications_v2", type: "Behavioral Profiling", severity: "Critical", confidence: "98.4%", time: "2 mins ago" },
  { name: "Global_Marketing_Reach", type: "Geopolitical", severity: "Healthy", confidence: "92.1%", time: "45 mins ago" },
  { name: "Retail_Sentiment_Analysis", type: "Ideological", severity: "Warning", confidence: "89.8%", time: "2 hours ago" }
];

export default function DashboardView({ onStartNew }: { onStartNew: () => void }) {
  return (
    <div className="space-y-6">
      {/* Header with Title and Actions */}
      <header className="flex justify-between items-end mb-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
          <p className="text-sm text-on-surface-variant">Unbiased Lens Engine v4.2 • Systems stable across all regions</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onStartNew}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all"
          >
            Run New Scan
          </button>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-card">
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Disparate Impact</div>
          <div className="text-2xl font-bold mt-1">0.72</div>
          <div className="text-[12px] mt-1 flex items-center gap-1 text-error-dark">
            ▼ -12% Under threshold
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-card">
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Demographic Parity</div>
          <div className="text-2xl font-bold mt-1">0.84</div>
          <div className="text-[12px] mt-1 flex items-center gap-1 text-success-dark">
            ▲ +5% Nominal
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-card">
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Subgroups</div>
          <div className="text-2xl font-bold mt-1">32</div>
          <div className="text-[12px] mt-1 text-on-surface-variant">
            Cross-referenced
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-card">
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Bias Severity</div>
          <div className="text-2xl font-bold mt-1 text-error-dark">Critical</div>
          <div className="text-[12px] mt-1 text-error-dark">
            Perception mismatch
          </div>
        </div>
      </section>

      {/* Feature Grids - Visual Grid Pattern */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <div className="bg-white rounded-xl border border-border-subtle overflow-hidden shadow-card">
          <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center bg-slate-50/30">
            <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-secondary" />
              Real-time Logs
            </h3>
            <span className="text-[10px] font-bold text-on-surface-variant flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success-dark animate-pulse"></span>
              Live Feed
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {auditHistory.map((item, i) => (
              <div key={i} className="p-4 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-[13px] font-bold text-primary group-hover:text-secondary transition-colors">{item.name}</h4>
                  <span className={cn(
                    "text-[8px] font-black px-1.5 py-0.5 rounded tracking-tighter",
                    item.severity === "Critical" ? "bg-error-dim text-error-dark" :
                    item.severity === "Warning" ? "bg-warning-dim text-warning-dark" :
                    "bg-success-dim text-success-dark"
                  )}>
                    {item.severity.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-on-surface-variant font-medium">{item.type}</span>
                  <span className="text-slate-400 font-bold">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 text-[11px] font-bold text-secondary bg-slate-50/50 hover:bg-slate-50 border-t border-border-subtle uppercase tracking-widest transition-colors">
            View All Audit Events
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-primary text-white rounded-xl p-8 relative overflow-hidden shadow-lg flex flex-col justify-between min-h-[240px]">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase tracking-widest mb-4">
                <ShieldCheck className="w-3 h-3 text-secondary" />
                Security Validated
              </div>
              <h3 className="text-xl font-bold mb-2">Automated Policy Enforcement</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs italic font-medium">
                "Our neural engine automatically maps corporate guidelines to quantifiable parity metrics."
              </p>
            </div>
            <button className="relative z-10 mt-6 flex items-center justify-between bg-secondary text-primary px-4 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all group">
              Manage Policy Rules
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* Abstract UI Elements */}
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-secondary/10 rounded-full" />
          </div>
          
          <div className="bg-white border border-border-subtle rounded-xl p-6 shadow-card flex gap-4 items-center">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-border-subtle">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-0.5">Benchmarking</p>
              <h4 className="text-sm font-bold text-primary">Industry Standard Compliant</h4>
            </div>
            <button className="ml-auto text-on-surface-variant hover:text-primary transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
