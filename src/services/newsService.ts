import { News, NewsFormFields } from "../models/news";
import api from "./api"; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNews = async (): Promise<News[]> => {
  try {
    const response = await api.get<News[]>(`${API_BASE_URL}/News/GetAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error; 
  }
};

export const getNewsById = async (id: number): Promise<News> => {
  try {
    const response = await api.get<News>(`${API_BASE_URL}/News/GetById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news with id ${id}:`, error);
    throw error;
  }
};
export const createNews = async (formData: FormData): Promise<void> => {
  try {
    return await api.post(`${API_BASE_URL}/News/Create`, formData);
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }

};

export const updateNews = async (news: NewsFormFields): Promise<void> => {
  try {
    await api.put(`${API_BASE_URL}/News/Update`, news);
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

export const deleteNews = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_BASE_URL}/News/Delete/${id}`);
  } catch (error) {
    console.error(`Error deleting news with id ${id}:`, error);
    throw error;
  }
};
export const filterNews = async (filters: {
  keyword?: string;
  categoryId?: number;
  authorId?: number;
  fromDate?: string;
  toDate?: string;
  includeAuthor?: boolean;
  includeCategory?: boolean;
  includeComments?: boolean;
}): Promise<News[]> => {
  try {
    const response = await api.get<News[]>(`${API_BASE_URL}News/Filter`, {
      params: filters, 
    });
    return response.data;
  } catch (error) {
    console.error("Error filtering news:", error);
    throw error;
  }
};

