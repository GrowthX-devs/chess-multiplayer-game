import { AxiosRequestConfig } from "axios";

export const generateGameLinkConfig: AxiosRequestConfig = {
  method: "POST",
  url: `http://localhost:8080/api/generate-link`,
  headers: {
    "Content-Type": "application/json",
  },
};
