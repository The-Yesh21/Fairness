import { useState, useRef } from "react";
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Rocket, 
  Database, 
  Cloud,
  CheckCircle2,
  Calendar,
  User,
  Shield,
  MapPin,
  Loader2,
  Globe,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";
import axios from "axios";
import { motion } from "motion/react";
import React from "react";

export default function UploadView({ onAnalysisComplete }: { onAnalysisComplete: (data: any) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewData, setPreviewData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) uploadFile(selectedFile);
  };

  const uploadFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const response = await axios.post("/api/upload", formData);
      clearInterval(interval);
      setProgress(100);
      setPreviewData(response.data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setTimeout(() => setUploading(false), 500);
    }
  };

  const startAnalysis = async () => {
    if (!previewData) return;
    setUploading(true);
    try {
      const response = await axios.post("/api/analyze", {
        dataset: previewData.preview,
        config: { sensitiveAttribute: "Gender", targetColumn: "Decision" }
      });
      onAnalysisComplete(response.data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <section className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Dataset Manager</h2>
          <p className="text-sm text-on-surface-variant">Import recruitment datasets for intersectional audit.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-border-subtle px-4 py-2 rounded-lg text-primary font-bold hover:bg-slate-50 transition-colors text-xs shadow-card group">
          <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          Download Sample Template
        </button>
      </section>

      <div className="grid grid-cols-12 gap-6 pb-20">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Progress Card */}
          <div className="bg-white rounded-xl border border-border-subtle p-8 shadow-card">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border-subtle rounded-xl p-16 flex flex-col items-center justify-center text-center group hover:border-secondary transition-colors cursor-pointer bg-slate-50/50"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                accept=".csv,.xlsx,.json" 
              />
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="text-secondary w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-1">Import Dataset</h3>
              <p className="text-xs text-on-surface-variant mb-6 max-w-sm">Drag and drop recruitment files here or click to browse.</p>
              <button className="bg-primary text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-md hover:opacity-90 transition-colors">
                Select Files
              </button>
            </div>
            
            {progress > 0 && (
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-secondary rounded-full shadow-[0_0_8px_rgba(56,189,248,0.3)]" 
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {file?.name || "Processing"} ({progress}%)
                </span>
              </div>
            )}
          </div>

          {/* Table Preview */}
          {previewData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-border-subtle overflow-hidden shadow-card"
            >
              <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  <Eye className="w-4 h-4 text-secondary" />
                  Dataset Preview
                </h3>
                <span className="text-[10px] font-bold text-on-surface-variant">
                  {previewData.totalRows} records found
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-slate-50 text-on-surface-variant border-b border-border-subtle">
                    <tr>
                      {previewData.columns.slice(0, 6).map((col: string) => (
                        <th key={col} className="px-6 py-3 font-bold uppercase text-[10px] tracking-wider">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {previewData.preview.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        {previewData.columns.slice(0, 6).map((col: string) => (
                          <td key={col} className="px-6 py-3 text-primary font-medium">
                            {row[col] === "approved" ? (
                              <span className="bg-success-dim text-success-dark px-2 font-bold py-0.5 rounded-full text-[10px] uppercase">Approved</span>
                            ) : row[col] === "rejected" ? (
                              <span className="bg-error-dim text-error-dark px-2 font-bold py-0.5 rounded-full text-[10px] uppercase">Rejected</span>
                            ) : row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Configuration */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-border-subtle p-6 shadow-card">
            <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Target Sensitive Groups</h3>
            <div className="space-y-2">
              {[
                { label: "Gender", risk: "CRITICAL", bg: "bg-error-dim", text: "text-error-dark" },
                { label: "Age Group", risk: "HIGH RISK", bg: "bg-warning-dim", text: "text-warning-dark" },
                { label: "Race_Eth", risk: "DETECTED", bg: "bg-blue-50", text: "text-blue-700" }
              ].map((attr) => (
                <div key={attr.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-sm font-semibold">{attr.label}</span>
                  <span className={cn("text-[8px] px-2 py-0.5 rounded font-black tracking-tighter", attr.bg, attr.text)}>
                    {attr.risk}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Analysis Accuracy</label>
              <select className="w-full bg-[#F1F5F9] border-border-subtle rounded-lg text-xs p-2.5 font-bold outline-none ring-0">
                <option>Deep Contextual Audit</option>
                <option>Heuristic Screening</option>
              </select>
            </div>
          </div>

          <div className="bg-primary text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-secondary" />
              <div>
                <h4 className="text-sm font-bold">System Validation</h4>
                <p className="text-[10px] text-slate-400">Security: Encrypted Transit</p>
              </div>
            </div>
            <button 
              onClick={startAnalysis}
              disabled={!file || uploading}
              className="relative z-10 w-full bg-secondary text-primary py-3 rounded-lg font-black text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Core...
                </>
              ) : (
                <>
                  Start Audit Engine
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="relative z-10 text-[10px] text-center text-slate-400 mt-4 px-2">
              By clicking start, you agree to our AI auditing data privacy protocols.
            </p>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
