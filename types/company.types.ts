export const OUTREACH_GOALS = {
  PARTNERSHIP: "Partnership",
  COLLABORATION: "Collaboration",
  ADVICE: "Advice",
  MEETING: "Meeting",
  QUOTE_REQUEST: "Asking for a quote",
  QUESTION: "Asking a question",
  COMPANY_INTRODUCTION: "Company introduction",
};

export const COMPANY_SIZES = {
  TINY: "1-10",
  SMALL: "11-50",
  MEDIUM: "51-200",
  LARGE: "201-500",
  ENTERPRISE: "501+",
};

export enum CompanySize {
  TINY = "TINY",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  ENTERPRISE = "ENTERPRISE",
}

export enum OutreachGoal {
  PARTNERSHIP = "PARTNERSHIP",
  COLLABORATION = "COLLABORATION",
  ADVICE = "ADVICE",
  MEETING = "MEETING",
  QUOTE_REQUEST = "QUOTE_REQUEST",
  QUESTION = "QUESTION",
  COMPANY_INTRODUCTION = "COMPANY_INTRODUCTION",
}

export interface CompanyProfile {
  id: string;
  projectId: string;
  website?: string | null;
  ownerFirst?: string | null;
  ownerLast?: string | null;
  size: CompanySize;
  location?: string | null;
  industry?: string | null;
  goals: OutreachGoal[];
  createdAt: Date;
  updatedAt: Date;
  // Add any other fields that match your backend schema
}
