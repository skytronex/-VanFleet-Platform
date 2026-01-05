import axios from 'axios';

// Configure Axios to point to your Spring Boot Backend
const API_URL = 'http://localhost:8080/api/v1/trips';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const startTrip = async (tripData) => {
    try {
        const response = await api.post('/start', tripData);
        return response.data;
    } catch (error) {
        console.error("Error starting trip:", error);
        throw error;
    }
};

export const endTrip = async (tripId, endOdometer) => {
    try {
        const response = await api.put(`/${tripId}/end`, null, {
            params: { endOdometer }
        });
        return response.data;
    } catch (error) {
        console.error("Error ending trip:", error);
        throw error;
    }
};

export const getVanLogs = async (vanId, start, end) => {
    try {
        const response = await api.get(`/logs/${vanId}`, {
            params: { start, end }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching logs:", error);
        throw error;
    }
};

export default api;
