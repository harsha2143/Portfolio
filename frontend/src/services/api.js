import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }
    return Promise.reject(err);
  }
);

export const getBlogs = () => api.get("/blogs");
export const getGroupedBlogs = () => api.get("/blogs/grouped");
export const getBlogsBySubCategory = (mainCategory, subCategory) =>
  api.get(`/blogs/by-subcategory/${encodeURIComponent(mainCategory)}/${encodeURIComponent(subCategory)}`);
export const getBlogsByCategory = (mainCategory) =>
  api.get(`/blogs/by-category/${encodeURIComponent(mainCategory)}`);
export const getBlog = (slug) => api.get(`/blogs/${slug}`);
export const adminLogin = (email, password) =>
  api.post("/auth/login", { email, password });
export const adminGetBlogs = () => api.get("/blogs/admin/all");
export const adminGetBlog = (id) => api.get(`/blogs/admin/${id}`);
export const createBlog = (data) => api.post("/blogs", data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

export default api;
