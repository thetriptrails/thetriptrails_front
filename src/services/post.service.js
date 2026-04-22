import api from "../api/api";
import API from "../api/apiEndpoints";

/* ================= GET ALL POSTS ================= */
export const getAllPosts = async (params = {}) => {
  try {
    const res = await api.get(API.POSTS.GET_ALL(), { params });
    return res.data;
  } catch (error) {
    console.error("API ERROR:", error.response || error);
    throw error.response?.data || { msg: "Failed to fetch posts" };
  }
};

/* ================= GET POST BY SLUG ================= */
export const getPostBySlug = async (slug) => {
  try {
    const res = await api.get(API.POSTS.GET_BY_SLUG(slug));
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to fetch post" };
  }
};

/* ================= CREATE POST ================= */
export const createPost = async (data) => {
  try {
    const res = await api.post(API.POSTS.CREATE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to create post" };
  }
};

/* ================= UPDATE POST ================= */
export const updatePost = async (id, data) => {
  try {
    const res = await api.put(API.POSTS.UPDATE(id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to update post" };
  }
};

/* ================= DELETE POST ================= */
export const deletePost = async (id) => {
  try {
    const res = await api.delete(API.POSTS.DELETE(id));
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to delete post" };
  }
};