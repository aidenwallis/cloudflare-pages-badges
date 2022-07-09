import { ProjectStageStatus } from "./types";

export interface ShieldResponse {
  schemaVersion: number; // always 1
  label: string;
  message: string;
  color: string;
  isError: boolean;
  namedLogo: string;
  cacheSeconds: number;
}

// these statuses should return isError: true on the badge response
const errorStatuses = new Set<ProjectStageStatus>(["failure", "canceled"]);

const colors: Record<ProjectStageStatus, string> = {
  success: "success",
  idle: "informational",
  failure: "critical",
  canceled: "inactive",
  active: "green",
};

export function createResponse(status: ProjectStageStatus): ShieldResponse {
  return {
    schemaVersion: 1,
    label: "Cloudflare Pages",
    message: status,
    color: colors[status] || "grey",
    isError: errorStatuses.has(status),
    namedLogo: "cloudflare",
    cacheSeconds: 60,
  };
}
