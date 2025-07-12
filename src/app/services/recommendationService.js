import axiosInstance from "../lib/axiosInstance";

export const getRecommendation = async (payload) => {
    try {
        const response = await axiosInstance.post("/recommendation", payload);
        return response.data;
    } catch (error) {
        throw error?.response?.data || error.message;
    }
};
