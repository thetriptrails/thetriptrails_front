import api from "../api/api";
import API from "../api/apiEndpoints";

/* ================= COMMON ERROR HANDLER ================= */
const handleError = (error, fallbackMsg) => {
  const message = error.response?.data?.message || error.message || fallbackMsg;
  // This helps you see the exact Mongoose validation error in the frontend alert/toast
  throw { message, status: error.response?.status };
};

/* ================= HELPER: PREPARE FORM DATA ================= */
/**
 * Converts a plain JS object into FormData for multipart/form-data requests.
 * Handles Files, Arrays (includes), Dates, and signaling for image removal.
 */
const prepareFormData = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    // 1. Handle Arrays (e.g., includes: ["WiFi", "Meals"])
    if (key === "includes" && Array.isArray(value)) {
      value.forEach((item) => formData.append("includes", item));
    } 
    
    // 2. Handle Dates (Ensure valid date before toISOString)
    else if ((key === "fromDate" || key === "toDate") && value) {
      const dateObj = new Date(value);
      if (!isNaN(dateObj.getTime())) {
        formData.append(key, dateObj.toISOString());
      }
    } 
    
    // 3. Handle Numbers (Ensure they aren't empty strings)
    else if (key === "noOfPerson" || key === "rating") {
      if (value !== "" && value !== null) {
        formData.append(key, Number(value));
      }
    } 
    
    // 4. Handle Image File vs Removal vs URL
    else if (key === "image") {
      if (value instanceof File) {
        formData.append("image", value); // New upload
      } else if (value === null || value === "null" || value === "") {
        formData.append("image", "null"); // Trigger revert to default in controller
      }
      // If it's a string URL, we skip it (backend keeps existing)
    } 
    
    // 5. General fields (strings, etc.)
    else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
};

/* ================= API METHODS ================= */

export const getAllPackages = async (query = "") => {
  try {
    const baseEndpoint = typeof API.PACKAGES.GET_ALL === 'function' 
      ? API.PACKAGES.GET_ALL() 
      : API.PACKAGES.GET_ALL;

    const queryString = query && !query.startsWith('?') ? `?${query}` : query;
    const res = await api.get(`${baseEndpoint}${queryString}`);
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch packages");
  }
};

export const createPackage = async (data) => {
  try {
    const formData = prepareFormData(data);
    const res = await api.post(API.PACKAGES.CREATE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    handleError(error, "Failed to create package");
  }
};

export const updatePackage = async (id, data) => {
  try {
    const formData = prepareFormData(data);
    const res = await api.put(API.PACKAGES.UPDATE(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    handleError(error, "Failed to update package");
  }
};

export const getPackageById = async (id) => {
  try {
    const res = await api.get(API.PACKAGES.GET_BY_ID(id));
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch package");
  }
};

export const deletePackage = async (id) => {
  try {
    const res = await api.delete(API.PACKAGES.DELETE(id));
    return res.data;
  } catch (error) {
    handleError(error, "Failed to delete package");
  }
};