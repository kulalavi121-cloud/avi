import axios from 'axios';

// Base API URL
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchWWTPData = async (skip = 0, limit = 100) => {
    const response = await apiClient.get(`/data?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const fetchAnomalies = async (limit = 10) => {
    const response = await apiClient.get(`/anomalies?limit=${limit}`);
    return response.data;
};

export const fetchRecommendations = async (data) => {
    const response = await apiClient.post('/recommendations', data);
    return response.data;
};
