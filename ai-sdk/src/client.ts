import { apiFetch } from "./utils/fetch.js";

export class BaseClient {
  constructor(
    public apiKey: string,
    public baseURL = "http://localhost:5513/api",
  ) {}

  fetch(path: string, init: RequestInit) {
    return apiFetch(this.baseURL, this.apiKey, path, init);
  }
}
