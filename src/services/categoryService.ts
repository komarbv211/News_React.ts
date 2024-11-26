import { Category } from "../models/category";
import api from "./api"; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>(`${API_BASE_URL}Categories/GetAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error; 
  }
};

export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await api.get<Category>(`${API_BASE_URL}Categories/GetById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }
};
export const GetByIdWithNews = async (id: number): Promise<Category> => {
    try {
      const response = await api.get<Category>(`${API_BASE_URL}Categories/GetByWithNews/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with id ${id}:`, error);
      throw error;
    }
  };
  

export const createCategory = async (news: Category): Promise<void> => {
  try {
    await api.post(`${API_BASE_URL}Categories/Create`, news);
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (news: Category): Promise<void> => {
  try {
    await api.put(`${API_BASE_URL}Categories/Update`, news);
  } catch (error) {
    console.error("Error updating categoryes:", error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_BASE_URL}Categories/Delete/${id}`);
  } catch (error) {
    console.error(`Error deleting news with id ${id}:`, error);
    throw error;
  }
};