import api from "../api/api";
import API from "../api/apiEndpoints";

/* ================= GET ALL TESTIMONIALS ================= */
export const getAllTestimonials = async (params = {}) => {
  try {
    const res = await api.get(API.TESTIMONIALS.GET_ALL, { params });
    return res.data;
  } catch (error) {
    console.error("API ERROR:", error.response || error);
    throw error.response?.data || { msg: "Failed to fetch testimonials" };
  }
};

/* ================= CREATE TESTIMONIAL ================= */
export const createTestimonial = async (data) => {
  try {
    const res = await api.post(API.TESTIMONIALS.CREATE, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to create testimonial" };
  }
};

/* ================= UPDATE TESTIMONIAL ================= */
export const updateTestimonial = async (id, data) => {
  try {
    const res = await api.put(API.TESTIMONIALS.UPDATE(id), data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to update testimonial" };
  }
};

/* ================= DELETE TESTIMONIAL ================= */
export const deleteTestimonial = async (id) => {
  try {
    const res = await api.delete(API.TESTIMONIALS.DELETE(id));
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to delete testimonial" };
  }
};