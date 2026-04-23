import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import { parse } from "csv-parse/sync";
import { GoogleGenAI } from "@google/genai";

// Services (Modular Backend Logic)
import { analyzeFairness } from "./src/services/fairnessCore";
import { analyzePerception } from "./src/services/perceptionBias";
import { analyzeBehavioral } from "./src/services/behavioralBias";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const upload = multer({ storage: multer.memoryStorage() });

  app.use(express.json());

  // API Endpoints
  app.post("/api/upload", upload.single("file"), async (req: any, res) => {
    const mReq = req as { file?: any };
    try {
      if (!mReq.file) return res.status(400).json({ error: "No file uploaded" });
      
      const content = mReq.file.buffer.toString();
      const records = parse(content, { columns: true, skip_empty_lines: true });
      
      // Auto-detect columns
      const columns = Object.keys(records[0] || {});
      const sensitiveAttributes = columns.filter(col => 
        /gender|age|race|ethnicity|zip|postal|origin/i.test(col)
      );

      res.json({
        totalRows: records.length,
        columns,
        sensitiveAttributes,
        preview: records.slice(0, 5)
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process file" });
    }
  });

  app.post("/api/analyze", async (req, res) => {
    const { dataset, config } = req.body;
    
    // In a real app, we'd process the full dataset here.
    // For this demonstration, we'll return sophisticated metrics based on the input.
    const fairnessResults = analyzeFairness(dataset, config.sensitiveAttribute);
    const perceptionResults = await analyzePerception(dataset);
    const behavioralResults = await analyzeBehavioral(dataset);

    res.json({
      fairness: fairnessResults,
      perception: perceptionResults,
      behavioral: behavioralResults,
      timestamp: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FairLens Server running on http://localhost:${PORT}`);
  });
}

startServer();
