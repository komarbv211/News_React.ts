import { Author } from "../models/author";
import api from "./api"; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllAuthors = async (): Promise<Author[]> => {
  try {
    const response = await api.get<Author[]>(`${API_BASE_URL}Authors/GetAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching author:", error);
    throw error; 
  }
};

export const getAuthorById = async (id: number): Promise<Author> => {
  try {
    const response = await api.get<Author>(`${API_BASE_URL}Authors/GetById${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching author with id ${id}:`, error);
    throw error;
  }
};
  

export const createAuthor = async (news: Author): Promise<void> => {
  try {
    await api.post(`${API_BASE_URL}Authors/Create`, news);
  } catch (error) {
    console.error("Error creating author:", error);
    throw error;
  }
};

export const updateAuthor = async (news: Author): Promise<void> => {
  try {
    await api.put(`${API_BASE_URL}Authors/Update`, news);
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

export const deleteAuthor = async (id: number): Promise<void> => {
  try {
    await api.delete(`${API_BASE_URL}Authors/Delete${id}`);
  } catch (error) {
    console.error(`Error deleting news with id ${id}:`, error);
    throw error;
  }
};
export const filterAuthors = async (
  fullName?: string,
  userId?: string,
  includeNews: boolean = false
): Promise<Author[]> => {
  try {
    const params: { [key: string]: string | boolean } = {};
    if (fullName) params.fullName = fullName;
    if (userId) params.userId = userId;
    params.includeNews = includeNews;
    const response = await api.get<Author[]>(`${API_BASE_URL}Authors/Filter`, {
      params, 
    });

    return response.data;
  } catch (error) {
    console.error("Error filtering authors:", error);
    throw error;
  }
};

export const getAuthorIdByUserId = async (id: number): Promise<Author> => {
  try {
    const response = await api.get<Author>(`${API_BASE_URL}Authors/GetByUserId/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching author with news by id ${id}:`, error);
    throw error;
  }
};