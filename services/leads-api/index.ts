import axios from "axios";
export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const leadsApi = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

export default leadsApi;
