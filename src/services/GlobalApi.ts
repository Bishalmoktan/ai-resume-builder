import { ICreateResume } from "@/types/types";
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAP_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = (data: { data: ICreateResume }) =>
  axiosClient.post("/resumes", data);

const getUserResumes = (userEmail: string) => axiosClient.get(`/resumes?filters[userEmail][$eq]=${userEmail}`);

export default {
  createNewResume,
  getUserResumes
};
