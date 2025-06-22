import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

export const fetchAllCarsData = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/cars`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car data:', error);
    throw error;
  }
};

export const fetchCarsBySearchTerm = async (searchTerm: string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/cars/search`, {
      params: { q: searchTerm }
    });
    return response;
  } catch (error) {
    console.error('Error fetching car data by search term:', error);
    throw error;
  }
}

export const fetchCarsByFilter = async (column: string, queryType: string, value: string | number, type: string) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/cars/filter`, {
      params: { column, queryType, value, type }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching car data by filter:', error);
    throw error;
  }
}

export const deleteCarById = async (carId: string) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/cars/${carId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting car by ID:', error);
    throw error;
  }
}