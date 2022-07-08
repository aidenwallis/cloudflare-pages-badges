import { CloudflareResponse, Project } from "./types";

declare global {
  const CLOUDFLARE_ACCOUNT_ID: string;
  const CLOUDFLARE_API_KEY: string;
}

const request = (url: string) =>
  fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
    },
  });

const handleResponse = (
  res: Response,
): Promise<CloudflareResponse<Project>> => {
  if (!res.ok) {
    throw new Error(`Invalid response: ${res.status}`);
  }
  return res.json();
};

interface CachedProject {
  cachedAt: number;
  project?: Project;
}

const cachedProjects: Record<string, CachedProject> = {};

export async function getProject(
  event: FetchEvent,
  projectName: string,
): Promise<Project | undefined> {
  if (
    cachedProjects[projectName]?.cachedAt &&
    Date.now() - cachedProjects[projectName]?.cachedAt < 60 * 1000
  ) {
    // fetched within the last 60s, use cache
    return cachedProjects[projectName]?.project;
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(
    CLOUDFLARE_ACCOUNT_ID,
  )}/pages/projects/${encodeURIComponent(projectName)}`;
  const resp = await request(url);
  const project = (await handleResponse(resp))?.result;

  cachedProjects[projectName] = {
    cachedAt: Date.now(),
    project: project,
  };

  return project;
}
