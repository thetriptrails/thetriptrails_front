import api from "../api/api";
import API from "../api/apiEndpoints";


export const submitForm = async (data) => {
  try {
    const res = await api.post(API.FORM.SUBMIT, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Form submission failed" };
  }
};

export const submitEnquiry = async (data) => {
  try {
    const res = await api.post(API.ENQUIRY.SUBMIT, data);
    return res.data;
  } catch (error) {
    const backendError = error.response?.data?.error;
    const errorMessage = Array.isArray(backendError) 
      ? backendError.join(", ") 
      : backendError || "Enquiry submission failed";
    throw { 
      success: false, 
      message: errorMessage,
      raw: error.response?.data 
    };
  }
};

export const getAllEnquiries = async () => {
  try {
    const res = await api.get(API.ENQUIRY.GET_ALL);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch enquiries" };
  }
};

export const updateEnquiryStatus = async (id, status) => {
  try {
    const res = await api.patch(API.ENQUIRY.UPDATE_STATUS(id), { status });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update status" };
  }
};