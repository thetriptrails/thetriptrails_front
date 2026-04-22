import api from "../api/api";
import API from "../api/apiEndpoints";

/* ================= GET ALL SERVICES ================= */
export const getAllServices = async (params = {}) => {
  try {
    const res = await api.get("/services", { params });
    return res.data;
  } catch (error) {
    console.error("API ERROR:", error.response || error);
    throw error.response?.data || { msg: "Failed to fetch services" };
  }
};

/* ================= GET SERVICE BY ID ================= */
export const getServiceById = async (id) => {
  try {
    const res = await api.get(API.SERVICES.GET_BY_ID(id));
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to fetch service" };
  }
};

/* ================= CREATE SERVICE ================= */
export const createService = async (data) => {
  try {
    const res = await api.post(API.SERVICES.CREATE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to create service" };
  }
};

/* ================= UPDATE SERVICE ================= */
export const updateService = async (id, data) => {
  try {
    const res = await api.put(API.SERVICES.UPDATE(id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to update service" };
  }
};

/* ================= DELETE SERVICE ================= */
export const deleteService = async (id) => {
  try {
    const res = await api.delete(API.SERVICES.DELETE(id));
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to delete service" };
  }
};
