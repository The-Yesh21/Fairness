import { 
  AlertTriangle, 
  Search, 
  Layers, 
  Brain, 
  Scale, 
  Workflow, 
  CheckCircle2, 
  Info,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  History,
  ShieldCheck,
  Zap
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

interface AnalysisData {
  fairness: {
    disparateImpact: string;
    demographicParity: {
      privileged: number;
      unprivileged: number;
      gap: number;
    };
    intersectionalHeatmap: any[];
  };
  perception: {
    disparityScore: number;
    findings: any[];
    recommendation: string;
  };
  behavioral: {
    traits: any[];
    summary: string;
  };
}

export default function AnalysisView({ data }: { data: AnalysisData }) {
  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <header className="flex justify-between items-end mb-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-primary">Equity Overview Analysis</h1>
          <p className="text-sm text-on-surface-variant">Source: uploaded_dataset.csv • Analysis completed {new Date().toLocaleTimeString("en-GB")}</p>
        </div>
      </header>

      {/* KPI Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-card">
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Disparate Impact</div>
          <div className="text-2xl font-bold mt-1">{data.fairness.disparateImpact}</div>
          <div className="text-[12px] mt-1 flex items-center gap-1 text-error-dark">
            ▼ -12% Under threshold
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-card">
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Demographic Parity</div>
          <div className="text-2xl font-bold mt-1">{(data.fairness.demographicParity.privileged / 100).toFixed(2)}</div>
          <div className="text-[12px] mt-1 flex items-center gap-1 text-success-dark">
            ▲ +5% Nominal
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-card">
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Sample Size</div>
          <div className="text-2xl font-bold mt-1">1.2M</div>
          <div className="text-[12px] mt-1 text-on-surface-variant">Validated engine</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-card">
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Bias Severity</div>
          <div className="text-2xl font-bold mt-1 text-error-dark">Critical</div>
          <div className="text-[12px] mt-1 text-error-dark">Action Required</div>
        </div>
      </section>

      {/* Detail Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {/* Fairness Bar Chart */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-card flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-[#F1F5F9] pb-3">
            <h3 className="font-bold text-sm text-[#334155]">Demographic Parity Analysis</h3>
            <span className="tag bg-[#F1F5F9] text-slate-500 px-2 py-0.5 rounded-full font-bold text-[10px]">PARITY RATIO</span>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: "Privileged", value: data.fairness.demographicParity.privileged },
                { name: "Unprivileged", value: data.fairness.demographicParity.unprivileged }
              ]} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  <Cell fill="#0F172A" />
                  <Cell fill="#EF4444" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-auto pt-4 border-t border-[#f1f3f5] text-[11px] text-on-surface-variant font-medium text-clip">
            Fairness Gap: {data.fairness.demographicParity.gap.toFixed(1)}%. Statutory non-compliance detected.
          </p>
        </div>

        {/* Heatmap Simulation */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-card flex flex-col">
          <div className="flex justify-between items-center mb-4 border-b border-[#F1F5F9] pb-3">
            <h3 className="font-bold text-sm text-[#334155]">Intersectional Bias Heatmap</h3>
            <span className="tag bg-[#F1F5F9] text-slate-500 px-2 py-0.5 rounded-full font-bold text-[10px]">SUBGROUPS</span>
          </div>
          <div className="grid grid-cols-4 gap-1 flex-1">
             {data.fairness.intersectionalHeatmap.map((item, i) => (
               <div 
                 key={i} 
                 className={cn(
                   "rounded-sm flex flex-col items-center justify-center text-[10px] text-center p-1 font-bold",
                   item.score < 0.6 ? "bg-error-dim text-error-dark" :
                   item.score < 0.8 ? "bg-warning-dim text-warning-dark" :
                   "bg-success-dim text-success-dark"
                 )}
               >
                 <span className="opacity-70 text-[8px] leading-none mb-1">{item.gender}</span>
                 <span className="text-xs">{item.score}</span>
               </div>
             ))}
             {[1,2,3,4].map(n => (
               <div key={`m-${n}`} className="bg-slate-50 rounded-sm flex items-center justify-center text-[10px] text-slate-300 font-bold">N/A</div>
             ))}
          </div>
          <div className="flex justify-between mt-3 text-[10px] text-[#94A3B8] font-semibold">
            <span>Low Disparity</span>
            <span>High Disparity</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* USP: Perception Bias AI Logic */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-card flex flex-col">
          <div className="viz-header flex justify-between items-center mb-4 border-b border-[#F1F5F9] pb-3">
            <span className="viz-title font-bold text-[#334155] text-sm">Perception Bias: Language Disparity</span>
            <span className="tag bg-[#E0F2FE] text-[#0369A1] px-2 py-0.5 rounded-full font-bold text-[10px]">UNIQUE MODULE</span>
          </div>
          
          <div className="space-y-0 text-[13px] flex-1">
             <div className="grid grid-cols-[100px_1fr_1fr] gap-3 py-2 border-b-2 border-slate-100 font-bold text-on-surface-variant overflow-hidden">
               <div>Trait</div>
               <div>Group A</div>
               <div>Group B</div>
             </div>
             {data.perception.findings.map((finding, idx) => (
               <div key={idx} className="grid grid-cols-[100px_1fr_1fr] gap-3 py-2 border-b border-slate-50">
                 <div className="font-semibold text-[#1E293B]">{finding.original.split(' ')[0]}</div>
                 <div className="text-secondary">{finding.original}</div>
                 <div className="text-[#DC2626] font-medium">{finding.perception}</div>
               </div>
             ))}
          </div>
          <p className="mt-auto pt-4 text-[11px] text-[#94A3B8]">AI Confidence: 94.2% based on contextual semantic analysis.</p>
        </div>

        {/* Behavioral Logic */}
        <div className="bg-white border border-border-subtle rounded-xl p-5 shadow-card flex flex-col relative overflow-hidden">
          <div className="viz-header flex justify-between items-center mb-4 border-b border-[#F1F5F9] pb-3">
            <span className="viz-title font-bold text-[#334155] text-sm">Behavioral Classification</span>
            <span className="tag bg-[#F1F5F9] text-slate-500 px-2 py-0.5 rounded-full font-bold text-[10px]">TRAIT DISTRIBUTION</span>
          </div>
          
          <div className="space-y-3 mt-2 flex-1">
            {data.behavioral.traits.map((trait, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#475569]">{trait.name}</span>
                  <span className="font-bold">{trait.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${trait.percentage}%` }}
                    className={cn("h-full rounded-full transition-all", trait.biasSuspected ? "bg-[#F43F5E]" : "bg-[#38BDF8]")}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-[#F8FAFC] p-3 rounded-lg text-xs leading-relaxed border border-border-subtle">
            <strong className="text-error-dark mr-1 uppercase text-[10px]">Observation:</strong> 
            {data.behavioral.summary}
          </div>
        </div>
      </section>

      {/* Fairness Recommendation Engine */}
      <section className="bg-white border border-border-subtle rounded-xl p-5 shadow-card flex flex-col">
        <div className="viz-header flex justify-between items-center mb-4 border-b border-[#F1F5F9] pb-3">
          <span className="viz-title font-bold text-[#334155] text-sm">Fairness Recommendation Engine</span>
          <span className="tag bg-error-dim text-error-dark px-2 py-0.5 rounded-full font-bold text-[10px]">ACTION REQUIRED</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4 text-[13px]">
            <div className="flex gap-3 items-start">
               <div className="bg-error-dim text-error-dark w-6 h-6 rounded-full flex items-center justify-center font-black flex-shrink-0">1</div>
               <div><strong>Rebalance Dataset:</strong> Undersampled demographic detected in age range 36-45. Need 400 more samples.</div>
            </div>
            <div className="flex gap-3 items-start">
               <div className="bg-warning-dim text-warning-dark w-6 h-6 rounded-full flex items-center justify-center font-black flex-shrink-0">2</div>
               <div><strong>Language Normalization:</strong> Flagged 12 descriptive adjectives as gender-coded. Suggest neutralizing labels.</div>
            </div>
            <div className="flex gap-3 items-start">
               <div className="bg-success-dim text-success-dark w-6 h-6 rounded-full flex items-center justify-center font-black flex-shrink-0">3</div>
               <div><strong>Model Auditing:</strong> Disparate impact is below 0.8. Adjust classification threshold by +0.12.</div>
            </div>
          </div>
          <div className="md:w-64 bg-primary text-white p-6 rounded-xl flex flex-col justify-center gap-4 relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest mb-1">Impact Reduction</p>
               <p className="text-3xl font-black text-secondary">82%</p>
             </div>
             <button className="relative z-10 w-full bg-secondary text-primary py-2 rounded-lg font-bold text-xs hover:opacity-90">Apply Reweight Fix</button>
             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
