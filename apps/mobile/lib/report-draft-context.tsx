import React, { createContext, useContext, useState, ReactNode } from "react";
import { DraftReport } from "./report-types";

interface ReportDraftContextValue {
  draft: DraftReport;
  setDraft: (updater: (prev: DraftReport) => DraftReport) => void;
  resetDraft: () => void;
}

const defaultDraft: DraftReport = {
  reportId: null,
  violationType: null,
  objectType: null,
  companyId: null,
  companyNameManual: "",
  description: "",
  isAnonymous: false
};

const ReportDraftContext = createContext<ReportDraftContextValue | undefined>(
  undefined
);

export function ReportDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<DraftReport>(defaultDraft);

  const setDraft = (updater: (prev: DraftReport) => DraftReport) => {
    setDraftState((prev) => updater(prev));
  };

  const resetDraft = () => setDraftState(defaultDraft);

  return (
    <ReportDraftContext.Provider value={{ draft, setDraft, resetDraft }}>
      {children}
    </ReportDraftContext.Provider>
  );
}

export function useReportDraft() {
  const ctx = useContext(ReportDraftContext);
  if (!ctx) {
    throw new Error("useReportDraft must be used within ReportDraftProvider");
  }
  return ctx;
}

