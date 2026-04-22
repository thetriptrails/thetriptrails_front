import api from "../api/api";
import API from "../api/apiEndpoints";

/* ================= GET ALL DESTINATIONS ================= */
export const getAllDestinations = async (params = {}) => {
  try {
    const res = await api.get(API.DESTINATIONS.GET_ALL, { params }); // ✅ FIXED
    return res.data;
  } catch (error) {
    console.error("API ERROR:", error.response || error);
    throw error.response?.data || { msg: "Failed to fetch destinations" };
  }
};

/* ================= GET DESTINATION BY ID ================= */
export const getDestinationById = async (id) => {
  try {
    const res = await api.get(API.DESTINATIONS.GET_BY_ID(id));
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to fetch destination" };
  }
};

/* ================= CREATE DESTINATION ================= */
export const createDestination = async (data) => {
  try {
    const res = await api.post(API.DESTINATIONS.CREATE, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to create destination" };
  }
};

/* ================= UPDATE DESTINATION ================= */
export const updateDestination = async (id, data) => {
  try {
    const res = await api.put(API.DESTINATIONS.UPDATE(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to update destination" };
  }
};

/* ================= DELETE DESTINATION ================= */
export const deleteDestination = async (id) => {
  try {
    const res = await api.delete(API.DESTINATIONS.DELETE(id));
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to delete destination" };
  }
};