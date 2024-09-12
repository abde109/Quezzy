import apiClient from ".";

export const getSettings = async () => {
  try {
    const response = await apiClient.get("/settings");
    return response.data;
  } catch (err: any) {
    throw err;
  }
};

export const updateSettings = async (data: any) => { 
  try {
    const response = await apiClient.post("/settings", data);
    return response.data;
  } catch (err: any) {
    throw err;
  }
}