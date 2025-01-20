export interface CompanyProfile {
  id: string;
  projectId: string;
  name?: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  // Add any other fields that match your backend schema
}
