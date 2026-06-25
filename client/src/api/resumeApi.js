import api from "./api";

// export const getResumes =
//   () =>
//     api.get(
//       "/api/resumes/my-resumes"
//     );


export const getResumes = () => {
  return api.get("/api/resume");
};


