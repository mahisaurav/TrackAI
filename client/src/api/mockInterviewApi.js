import api from "./api";

export const generateInterview = (
  data
) => {
  return api.post(
    "/api/mock/generate",
    data
  );
};