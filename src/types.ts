export interface CloudflareResponse<T> {
  success: boolean;
  errors: ResponseError[];
  result?: T;
}

export interface ResponseError {
  code: number;
  message: string;
}

export interface Project {
  canonical_deployment?: ProjectDeployment;
}

export interface ProjectDeployment {
  latest_stage?: ProjectStage;
}

export type ProjectStageStatus =
  | "success"
  | "canceled"
  | "idle"
  | "active"
  | "failure";

export interface ProjectStage {
  name?: string;
  status?: ProjectStageStatus;
}
