export const API_VERSION = "v1";

export const API_BASE_URL = "/api/" + API_VERSION;

export const PROJECTS_API_URL = API_BASE_URL + "/projects";

export const PROJECT_API_URL = (id: number) => API_BASE_URL + "/projects/" + id;