import { createContext, useContext } from "react";
import { ResumeInfoContextType } from "@/types/types";

export const ResumeInfoContext = createContext<ResumeInfoContextType | undefined>(undefined);

export const useResumeInfo = (): ResumeInfoContextType => {
  const context = useContext(ResumeInfoContext);
  if (context === undefined) {
    throw new Error("useResumeInfo must be used within a ResumeInfoProvider");
  }
  return context;
};
