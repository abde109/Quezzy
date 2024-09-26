// src/api/profile.ts
import apiClient from ".";

export const getUser = async () => {
    try {
        const response = await apiClient.get("/profile");
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const updateUser = async (data: any) => {
    try {
        const response = await apiClient.put("/profile", data);
        return response.data;
    } catch (err) {
        throw err;
    }
};
