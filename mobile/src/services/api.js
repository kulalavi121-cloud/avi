import axios from 'axios';

// Replace with your production URL or machine's IP address for local dev
const BASE_URL = 'https://avi-12.onrender.com/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchWWTPData = async (skip = 0, limit = 100) => {
    try {
        const response = await apiClient.get(`/data?skip=${skip}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("fetchWWTPData error:", error);
        throw error;
    }
};

export const fetchAnomalies = async (limit = 10) => {
    try {
        const response = await apiClient.get(`/anomalies?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("fetchAnomalies error:", error);
        throw error;
    }
};

export const fetchRecommendations = async (data) => {
    try {
        const response = await apiClient.post('/recommendations', data);
        return response.data;
    } catch (error) {
        console.error("fetchRecommendations error:", error);
        throw error;
    }
};
